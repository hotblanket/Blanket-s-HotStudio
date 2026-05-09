--!strict
--[[
    InfinityField.server.lua

    Roblox Studio server script for a "limitless/infinity" style defensive field.
    Put this Script in ServerScriptService.

    What it does:
    - Objects that get close to a player gradually lose speed.
    - Objects that enter the stop radius are held just outside the player.
    - Characters are ignored so normal player movement is not interrupted.

    Setup:
    1. Add this Script to ServerScriptService.
    2. Add any projectile/throwable parts you want affected to workspace.
    3. Optional: tag only affected parts with CollectionService tag "InfinityAffected"
       and set ONLY_AFFECT_TAGGED_OBJECTS to true below.
]]

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local CollectionService = game:GetService("CollectionService")

local FIELD_RADIUS = 32 -- studs: slowing starts inside this distance
local STOP_RADIUS = 7 -- studs: object is held at this minimum distance
local MAX_FORCE = 120000 -- larger/heavier assemblies may need more force
local ONLY_AFFECT_TAGGED_OBJECTS = false
local AFFECTED_TAG = "InfinityAffected"

local FIELD_OWNER_ATTRIBUTE = "InfinityEnabled"
local ATTACHMENT_NAME = "InfinityFieldAttachment"
local LINEAR_VELOCITY_NAME = "InfinityFieldBrake"

type Controller = {
    attachment: Attachment,
    linearVelocity: LinearVelocity,
    lastTouched: number,
}

local controllers: {[BasePart]: Controller} = {}

local function getRootPart(player: Player): BasePart?
    local character = player.Character
    if not character then
        return nil
    end

    local root = character:FindFirstChild("HumanoidRootPart")
    if root and root:IsA("BasePart") then
        return root
    end

    return nil
end

local function isCharacterPart(part: BasePart): boolean
    local model = part:FindFirstAncestorOfClass("Model")
    return model ~= nil and model:FindFirstChildOfClass("Humanoid") ~= nil
end

local function canAffect(part: BasePart): boolean
    if part.Anchored or isCharacterPart(part) then
        return false
    end

    if ONLY_AFFECT_TAGGED_OBJECTS and not CollectionService:HasTag(part, AFFECTED_TAG) then
        return false
    end

    return true
end

local function getController(part: BasePart): Controller
    local controller = controllers[part]
    if controller then
        controller.lastTouched = os.clock()
        return controller
    end

    local attachment = part:FindFirstChild(ATTACHMENT_NAME)
    if not attachment or not attachment:IsA("Attachment") then
        attachment = Instance.new("Attachment")
        attachment.Name = ATTACHMENT_NAME
        attachment.Parent = part
    end

    local linearVelocity = part:FindFirstChild(LINEAR_VELOCITY_NAME)
    if not linearVelocity or not linearVelocity:IsA("LinearVelocity") then
        linearVelocity = Instance.new("LinearVelocity")
        linearVelocity.Name = LINEAR_VELOCITY_NAME
        linearVelocity.Attachment0 = attachment
        linearVelocity.RelativeTo = Enum.ActuatorRelativeTo.World
        linearVelocity.ForceLimitsEnabled = true
        linearVelocity.MaxForce = MAX_FORCE
        linearVelocity.Enabled = false
        linearVelocity.Parent = part
    end

    controller = {
        attachment = attachment,
        linearVelocity = linearVelocity,
        lastTouched = os.clock(),
    }
    controllers[part] = controller

    return controller
end

local function releaseController(part: BasePart)
    local controller = controllers[part]
    if not controller then
        return
    end

    if controller.linearVelocity.Parent then
        controller.linearVelocity.Enabled = false
    end

    controllers[part] = nil
end

local function getClosestEnabledRoot(part: BasePart): (BasePart?, number)
    local closestRoot: BasePart? = nil
    local closestDistance = math.huge

    for _, player in Players:GetPlayers() do
        if player:GetAttribute(FIELD_OWNER_ATTRIBUTE) ~= false then
            local root = getRootPart(player)
            if root then
                local distance = (part.Position - root.Position).Magnitude
                if distance < closestDistance then
                    closestDistance = distance
                    closestRoot = root
                end
            end
        end
    end

    return closestRoot, closestDistance
end

RunService.Heartbeat:Connect(function()
    local parts = ONLY_AFFECT_TAGGED_OBJECTS and CollectionService:GetTagged(AFFECTED_TAG) or workspace:GetDescendants()

    for _, instance in parts do
        if instance:IsA("BasePart") and canAffect(instance) then
            local root, distance = getClosestEnabledRoot(instance)
            local controller = controllers[instance]

            if root and distance <= FIELD_RADIUS then
                local directionFromPlayer = instance.Position - root.Position
                if directionFromPlayer.Magnitude < 0.01 then
                    directionFromPlayer = root.CFrame.LookVector
                end

                local unitDirection = directionFromPlayer.Unit
                local slowAlpha = math.clamp((distance - STOP_RADIUS) / (FIELD_RADIUS - STOP_RADIUS), 0, 1)
                local currentVelocity = instance.AssemblyLinearVelocity

                -- Keep only a small percentage of the object's incoming speed as it gets closer.
                local allowedSpeed = currentVelocity.Magnitude * slowAlpha
                local outwardHoldSpeed = 0

                if distance <= STOP_RADIUS then
                    -- Push/hold the object outward so it appears to stop at the barrier.
                    local targetPosition = root.Position + unitDirection * STOP_RADIUS
                    outwardHoldSpeed = math.clamp((targetPosition - instance.Position).Magnitude * 18, 0, 22)
                end

                local targetVelocity = unitDirection * math.max(allowedSpeed, outwardHoldSpeed)
                local activeController = getController(instance)
                activeController.linearVelocity.VectorVelocity = targetVelocity
                activeController.linearVelocity.Enabled = true
            elseif controller then
                releaseController(instance)
            end
        end
    end
end)

workspace.DescendantRemoving:Connect(function(instance: Instance)
    if instance:IsA("BasePart") then
        controllers[instance] = nil
    end
end)
