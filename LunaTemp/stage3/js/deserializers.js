var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i642 = root || request.c( 'UnityEngine.JointSpring' )
  var i643 = data
  i642.spring = i643[0]
  i642.damper = i643[1]
  i642.targetPosition = i643[2]
  return i642
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i644 = root || request.c( 'UnityEngine.JointMotor' )
  var i645 = data
  i644.m_TargetVelocity = i645[0]
  i644.m_Force = i645[1]
  i644.m_FreeSpin = i645[2]
  return i644
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i646 = root || request.c( 'UnityEngine.JointLimits' )
  var i647 = data
  i646.m_Min = i647[0]
  i646.m_Max = i647[1]
  i646.m_Bounciness = i647[2]
  i646.m_BounceMinVelocity = i647[3]
  i646.m_ContactDistance = i647[4]
  i646.minBounce = i647[5]
  i646.maxBounce = i647[6]
  return i646
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i648 = root || request.c( 'UnityEngine.JointDrive' )
  var i649 = data
  i648.m_PositionSpring = i649[0]
  i648.m_PositionDamper = i649[1]
  i648.m_MaximumForce = i649[2]
  return i648
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i650 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i651 = data
  i650.m_Spring = i651[0]
  i650.m_Damper = i651[1]
  return i650
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i652 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i653 = data
  i652.m_Limit = i653[0]
  i652.m_Bounciness = i653[1]
  i652.m_ContactDistance = i653[2]
  return i652
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i654 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i655 = data
  i654.m_ExtremumSlip = i655[0]
  i654.m_ExtremumValue = i655[1]
  i654.m_AsymptoteSlip = i655[2]
  i654.m_AsymptoteValue = i655[3]
  i654.m_Stiffness = i655[4]
  return i654
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i656 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i657 = data
  i656.m_LowerAngle = i657[0]
  i656.m_UpperAngle = i657[1]
  return i656
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i658 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i659 = data
  i658.m_MotorSpeed = i659[0]
  i658.m_MaximumMotorTorque = i659[1]
  return i658
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i660 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i661 = data
  i660.m_DampingRatio = i661[0]
  i660.m_Frequency = i661[1]
  i660.m_Angle = i661[2]
  return i660
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i662 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i663 = data
  i662.m_LowerTranslation = i663[0]
  i662.m_UpperTranslation = i663[1]
  return i662
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i664 = root || new pc.UnityMaterial()
  var i665 = data
  i664.name = i665[0]
  request.r(i665[1], i665[2], 0, i664, 'shader')
  i664.renderQueue = i665[3]
  i664.enableInstancing = !!i665[4]
  var i667 = i665[5]
  var i666 = []
  for(var i = 0; i < i667.length; i += 1) {
    i666.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i667[i + 0]) );
  }
  i664.floatParameters = i666
  var i669 = i665[6]
  var i668 = []
  for(var i = 0; i < i669.length; i += 1) {
    i668.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i669[i + 0]) );
  }
  i664.colorParameters = i668
  var i671 = i665[7]
  var i670 = []
  for(var i = 0; i < i671.length; i += 1) {
    i670.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i671[i + 0]) );
  }
  i664.vectorParameters = i670
  var i673 = i665[8]
  var i672 = []
  for(var i = 0; i < i673.length; i += 1) {
    i672.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i673[i + 0]) );
  }
  i664.textureParameters = i672
  var i675 = i665[9]
  var i674 = []
  for(var i = 0; i < i675.length; i += 1) {
    i674.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i675[i + 0]) );
  }
  i664.materialFlags = i674
  return i664
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i678 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i679 = data
  i678.name = i679[0]
  i678.value = i679[1]
  return i678
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i682 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i683 = data
  i682.name = i683[0]
  i682.value = new pc.Color(i683[1], i683[2], i683[3], i683[4])
  return i682
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i686 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i687 = data
  i686.name = i687[0]
  i686.value = new pc.Vec4( i687[1], i687[2], i687[3], i687[4] )
  return i686
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i690 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i691 = data
  i690.name = i691[0]
  request.r(i691[1], i691[2], 0, i690, 'value')
  return i690
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i694 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i695 = data
  i694.name = i695[0]
  i694.enabled = !!i695[1]
  return i694
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i696 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i697 = data
  i696.position = new pc.Vec3( i697[0], i697[1], i697[2] )
  i696.scale = new pc.Vec3( i697[3], i697[4], i697[5] )
  i696.rotation = new pc.Quat(i697[6], i697[7], i697[8], i697[9])
  return i696
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i698 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i699 = data
  i698.name = i699[0]
  i698.tag = i699[1]
  i698.enabled = !!i699[2]
  i698.isStatic = !!i699[3]
  i698.layer = i699[4]
  return i698
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i700 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i701 = data
  i700.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i701[0], i700.main)
  i700.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i701[1], i700.colorBySpeed)
  i700.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i701[2], i700.colorOverLifetime)
  i700.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i701[3], i700.emission)
  i700.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i701[4], i700.rotationBySpeed)
  i700.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i701[5], i700.rotationOverLifetime)
  i700.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i701[6], i700.shape)
  i700.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i701[7], i700.sizeBySpeed)
  i700.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i701[8], i700.sizeOverLifetime)
  i700.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i701[9], i700.textureSheetAnimation)
  i700.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i701[10], i700.velocityOverLifetime)
  i700.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i701[11], i700.noise)
  i700.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i701[12], i700.inheritVelocity)
  i700.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i701[13], i700.forceOverLifetime)
  i700.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i701[14], i700.limitVelocityOverLifetime)
  i700.useAutoRandomSeed = !!i701[15]
  i700.randomSeed = i701[16]
  return i700
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i702 = root || new pc.ParticleSystemMain()
  var i703 = data
  i702.duration = i703[0]
  i702.loop = !!i703[1]
  i702.prewarm = !!i703[2]
  i702.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i703[3], i702.startDelay)
  i702.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i703[4], i702.startLifetime)
  i702.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i703[5], i702.startSpeed)
  i702.startSize3D = !!i703[6]
  i702.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i703[7], i702.startSizeX)
  i702.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i703[8], i702.startSizeY)
  i702.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i703[9], i702.startSizeZ)
  i702.startRotation3D = !!i703[10]
  i702.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i703[11], i702.startRotationX)
  i702.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i703[12], i702.startRotationY)
  i702.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i703[13], i702.startRotationZ)
  i702.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i703[14], i702.startColor)
  i702.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i703[15], i702.gravityModifier)
  i702.simulationSpace = i703[16]
  request.r(i703[17], i703[18], 0, i702, 'customSimulationSpace')
  i702.simulationSpeed = i703[19]
  i702.useUnscaledTime = !!i703[20]
  i702.scalingMode = i703[21]
  i702.playOnAwake = !!i703[22]
  i702.maxParticles = i703[23]
  i702.emitterVelocityMode = i703[24]
  return i702
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i704 = root || new pc.MinMaxCurve()
  var i705 = data
  i704.mode = i705[0]
  i704.curveMin = new pc.AnimationCurve( { keys_flow: i705[1] } )
  i704.curveMax = new pc.AnimationCurve( { keys_flow: i705[2] } )
  i704.curveMultiplier = i705[3]
  i704.constantMin = i705[4]
  i704.constantMax = i705[5]
  return i704
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i706 = root || new pc.MinMaxGradient()
  var i707 = data
  i706.mode = i707[0]
  i706.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i707[1], i706.gradientMin)
  i706.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i707[2], i706.gradientMax)
  i706.colorMin = new pc.Color(i707[3], i707[4], i707[5], i707[6])
  i706.colorMax = new pc.Color(i707[7], i707[8], i707[9], i707[10])
  return i706
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i708 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i709 = data
  i708.mode = i709[0]
  var i711 = i709[1]
  var i710 = []
  for(var i = 0; i < i711.length; i += 1) {
    i710.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i711[i + 0]) );
  }
  i708.colorKeys = i710
  var i713 = i709[2]
  var i712 = []
  for(var i = 0; i < i713.length; i += 1) {
    i712.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i713[i + 0]) );
  }
  i708.alphaKeys = i712
  return i708
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i714 = root || new pc.ParticleSystemColorBySpeed()
  var i715 = data
  i714.enabled = !!i715[0]
  i714.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i715[1], i714.color)
  i714.range = new pc.Vec2( i715[2], i715[3] )
  return i714
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i718 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i719 = data
  i718.color = new pc.Color(i719[0], i719[1], i719[2], i719[3])
  i718.time = i719[4]
  return i718
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i722 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i723 = data
  i722.alpha = i723[0]
  i722.time = i723[1]
  return i722
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i724 = root || new pc.ParticleSystemColorOverLifetime()
  var i725 = data
  i724.enabled = !!i725[0]
  i724.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i725[1], i724.color)
  return i724
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i726 = root || new pc.ParticleSystemEmitter()
  var i727 = data
  i726.enabled = !!i727[0]
  i726.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i727[1], i726.rateOverTime)
  i726.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i727[2], i726.rateOverDistance)
  var i729 = i727[3]
  var i728 = []
  for(var i = 0; i < i729.length; i += 1) {
    i728.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i729[i + 0]) );
  }
  i726.bursts = i728
  return i726
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i732 = root || new pc.ParticleSystemBurst()
  var i733 = data
  i732.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i733[0], i732.count)
  i732.cycleCount = i733[1]
  i732.minCount = i733[2]
  i732.maxCount = i733[3]
  i732.repeatInterval = i733[4]
  i732.time = i733[5]
  return i732
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i734 = root || new pc.ParticleSystemRotationBySpeed()
  var i735 = data
  i734.enabled = !!i735[0]
  i734.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i735[1], i734.x)
  i734.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i735[2], i734.y)
  i734.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i735[3], i734.z)
  i734.separateAxes = !!i735[4]
  i734.range = new pc.Vec2( i735[5], i735[6] )
  return i734
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i736 = root || new pc.ParticleSystemRotationOverLifetime()
  var i737 = data
  i736.enabled = !!i737[0]
  i736.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i737[1], i736.x)
  i736.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i737[2], i736.y)
  i736.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i737[3], i736.z)
  i736.separateAxes = !!i737[4]
  return i736
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i738 = root || new pc.ParticleSystemShape()
  var i739 = data
  i738.enabled = !!i739[0]
  i738.shapeType = i739[1]
  i738.randomDirectionAmount = i739[2]
  i738.sphericalDirectionAmount = i739[3]
  i738.randomPositionAmount = i739[4]
  i738.alignToDirection = !!i739[5]
  i738.radius = i739[6]
  i738.radiusMode = i739[7]
  i738.radiusSpread = i739[8]
  i738.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i739[9], i738.radiusSpeed)
  i738.radiusThickness = i739[10]
  i738.angle = i739[11]
  i738.length = i739[12]
  i738.boxThickness = new pc.Vec3( i739[13], i739[14], i739[15] )
  i738.meshShapeType = i739[16]
  request.r(i739[17], i739[18], 0, i738, 'mesh')
  request.r(i739[19], i739[20], 0, i738, 'meshRenderer')
  request.r(i739[21], i739[22], 0, i738, 'skinnedMeshRenderer')
  i738.useMeshMaterialIndex = !!i739[23]
  i738.meshMaterialIndex = i739[24]
  i738.useMeshColors = !!i739[25]
  i738.normalOffset = i739[26]
  i738.arc = i739[27]
  i738.arcMode = i739[28]
  i738.arcSpread = i739[29]
  i738.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i739[30], i738.arcSpeed)
  i738.donutRadius = i739[31]
  i738.position = new pc.Vec3( i739[32], i739[33], i739[34] )
  i738.rotation = new pc.Vec3( i739[35], i739[36], i739[37] )
  i738.scale = new pc.Vec3( i739[38], i739[39], i739[40] )
  return i738
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i740 = root || new pc.ParticleSystemSizeBySpeed()
  var i741 = data
  i740.enabled = !!i741[0]
  i740.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i741[1], i740.x)
  i740.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i741[2], i740.y)
  i740.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i741[3], i740.z)
  i740.separateAxes = !!i741[4]
  i740.range = new pc.Vec2( i741[5], i741[6] )
  return i740
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i742 = root || new pc.ParticleSystemSizeOverLifetime()
  var i743 = data
  i742.enabled = !!i743[0]
  i742.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i743[1], i742.x)
  i742.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i743[2], i742.y)
  i742.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i743[3], i742.z)
  i742.separateAxes = !!i743[4]
  return i742
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i744 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i745 = data
  i744.enabled = !!i745[0]
  i744.mode = i745[1]
  i744.animation = i745[2]
  i744.numTilesX = i745[3]
  i744.numTilesY = i745[4]
  i744.useRandomRow = !!i745[5]
  i744.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i745[6], i744.frameOverTime)
  i744.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i745[7], i744.startFrame)
  i744.cycleCount = i745[8]
  i744.rowIndex = i745[9]
  i744.flipU = i745[10]
  i744.flipV = i745[11]
  i744.spriteCount = i745[12]
  var i747 = i745[13]
  var i746 = []
  for(var i = 0; i < i747.length; i += 2) {
  request.r(i747[i + 0], i747[i + 1], 2, i746, '')
  }
  i744.sprites = i746
  return i744
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i750 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i751 = data
  i750.enabled = !!i751[0]
  i750.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i751[1], i750.x)
  i750.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i751[2], i750.y)
  i750.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i751[3], i750.z)
  i750.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i751[4], i750.speedModifier)
  i750.space = i751[5]
  return i750
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i752 = root || new pc.ParticleSystemNoise()
  var i753 = data
  i752.enabled = !!i753[0]
  i752.separateAxes = !!i753[1]
  i752.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i753[2], i752.strengthX)
  i752.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i753[3], i752.strengthY)
  i752.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i753[4], i752.strengthZ)
  i752.frequency = i753[5]
  i752.damping = !!i753[6]
  i752.octaveCount = i753[7]
  i752.octaveMultiplier = i753[8]
  i752.octaveScale = i753[9]
  i752.quality = i753[10]
  i752.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i753[11], i752.scrollSpeed)
  i752.scrollSpeedMultiplier = i753[12]
  i752.remapEnabled = !!i753[13]
  i752.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i753[14], i752.remapX)
  i752.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i753[15], i752.remapY)
  i752.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i753[16], i752.remapZ)
  i752.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i753[17], i752.positionAmount)
  i752.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i753[18], i752.rotationAmount)
  i752.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i753[19], i752.sizeAmount)
  return i752
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i754 = root || new pc.ParticleSystemInheritVelocity()
  var i755 = data
  i754.enabled = !!i755[0]
  i754.mode = i755[1]
  i754.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i755[2], i754.curve)
  return i754
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i756 = root || new pc.ParticleSystemForceOverLifetime()
  var i757 = data
  i756.enabled = !!i757[0]
  i756.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i757[1], i756.x)
  i756.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i757[2], i756.y)
  i756.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i757[3], i756.z)
  i756.space = i757[4]
  i756.randomized = !!i757[5]
  return i756
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i758 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i759 = data
  i758.enabled = !!i759[0]
  i758.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i759[1], i758.limitX)
  i758.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i759[2], i758.limitY)
  i758.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i759[3], i758.limitZ)
  i758.dampen = i759[4]
  i758.separateAxes = !!i759[5]
  i758.space = i759[6]
  i758.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i759[7], i758.drag)
  i758.multiplyDragByParticleSize = !!i759[8]
  i758.multiplyDragByParticleVelocity = !!i759[9]
  return i758
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i760 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i761 = data
  i760.enabled = !!i761[0]
  request.r(i761[1], i761[2], 0, i760, 'sharedMaterial')
  var i763 = i761[3]
  var i762 = []
  for(var i = 0; i < i763.length; i += 2) {
  request.r(i763[i + 0], i763[i + 1], 2, i762, '')
  }
  i760.sharedMaterials = i762
  i760.receiveShadows = !!i761[4]
  i760.shadowCastingMode = i761[5]
  i760.sortingLayerID = i761[6]
  i760.sortingOrder = i761[7]
  i760.lightmapIndex = i761[8]
  i760.lightmapSceneIndex = i761[9]
  i760.lightmapScaleOffset = new pc.Vec4( i761[10], i761[11], i761[12], i761[13] )
  i760.lightProbeUsage = i761[14]
  i760.reflectionProbeUsage = i761[15]
  request.r(i761[16], i761[17], 0, i760, 'mesh')
  i760.meshCount = i761[18]
  i760.activeVertexStreamsCount = i761[19]
  i760.alignment = i761[20]
  i760.renderMode = i761[21]
  i760.sortMode = i761[22]
  i760.lengthScale = i761[23]
  i760.velocityScale = i761[24]
  i760.cameraVelocityScale = i761[25]
  i760.normalDirection = i761[26]
  i760.sortingFudge = i761[27]
  i760.minParticleSize = i761[28]
  i760.maxParticleSize = i761[29]
  i760.pivot = new pc.Vec3( i761[30], i761[31], i761[32] )
  request.r(i761[33], i761[34], 0, i760, 'trailMaterial')
  return i760
}

Deserializers["CFX_AutoDestructShuriken"] = function (request, data, root) {
  var i766 = root || request.c( 'CFX_AutoDestructShuriken' )
  var i767 = data
  i766.OnlyDeactivate = !!i767[0]
  return i766
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i768 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i769 = data
  i768.name = i769[0]
  i768.width = i769[1]
  i768.height = i769[2]
  i768.mipmapCount = i769[3]
  i768.anisoLevel = i769[4]
  i768.filterMode = i769[5]
  i768.hdr = !!i769[6]
  i768.format = i769[7]
  i768.wrapMode = i769[8]
  i768.alphaIsTransparency = !!i769[9]
  i768.alphaSource = i769[10]
  return i768
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i770 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i771 = data
  i770.name = i771[0]
  i770.halfPrecision = !!i771[1]
  i770.vertexCount = i771[2]
  i770.aabb = i771[3]
  var i773 = i771[4]
  var i772 = []
  for(var i = 0; i < i773.length; i += 1) {
    i772.push( !!i773[i + 0] );
  }
  i770.streams = i772
  i770.vertices = i771[5]
  var i775 = i771[6]
  var i774 = []
  for(var i = 0; i < i775.length; i += 1) {
    i774.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i775[i + 0]) );
  }
  i770.subMeshes = i774
  var i777 = i771[7]
  var i776 = []
  for(var i = 0; i < i777.length; i += 16) {
    i776.push( new pc.Mat4().setData(i777[i + 0], i777[i + 1], i777[i + 2], i777[i + 3],  i777[i + 4], i777[i + 5], i777[i + 6], i777[i + 7],  i777[i + 8], i777[i + 9], i777[i + 10], i777[i + 11],  i777[i + 12], i777[i + 13], i777[i + 14], i777[i + 15]) );
  }
  i770.bindposes = i776
  var i779 = i771[8]
  var i778 = []
  for(var i = 0; i < i779.length; i += 1) {
    i778.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i779[i + 0]) );
  }
  i770.blendShapes = i778
  return i770
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i784 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i785 = data
  i784.triangles = i785[0]
  return i784
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i790 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i791 = data
  i790.name = i791[0]
  var i793 = i791[1]
  var i792 = []
  for(var i = 0; i < i793.length; i += 1) {
    i792.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i793[i + 0]) );
  }
  i790.frames = i792
  return i790
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i794 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i795 = data
  request.r(i795[0], i795[1], 0, i794, 'sharedMesh')
  return i794
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i796 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i797 = data
  request.r(i797[0], i797[1], 0, i796, 'additionalVertexStreams')
  i796.enabled = !!i797[2]
  request.r(i797[3], i797[4], 0, i796, 'sharedMaterial')
  var i799 = i797[5]
  var i798 = []
  for(var i = 0; i < i799.length; i += 2) {
  request.r(i799[i + 0], i799[i + 1], 2, i798, '')
  }
  i796.sharedMaterials = i798
  i796.receiveShadows = !!i797[6]
  i796.shadowCastingMode = i797[7]
  i796.sortingLayerID = i797[8]
  i796.sortingOrder = i797[9]
  i796.lightmapIndex = i797[10]
  i796.lightmapSceneIndex = i797[11]
  i796.lightmapScaleOffset = new pc.Vec4( i797[12], i797[13], i797[14], i797[15] )
  i796.lightProbeUsage = i797[16]
  i796.reflectionProbeUsage = i797[17]
  return i796
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i800 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i801 = data
  request.r(i801[0], i801[1], 0, i800, 'animatorController')
  i800.updateMode = i801[2]
  var i803 = i801[3]
  var i802 = []
  for(var i = 0; i < i803.length; i += 2) {
  request.r(i803[i + 0], i803[i + 1], 2, i802, '')
  }
  i800.humanBones = i802
  i800.enabled = !!i801[4]
  return i800
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i806 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i807 = data
  i806.enabled = !!i807[0]
  request.r(i807[1], i807[2], 0, i806, 'sharedMaterial')
  var i809 = i807[3]
  var i808 = []
  for(var i = 0; i < i809.length; i += 2) {
  request.r(i809[i + 0], i809[i + 1], 2, i808, '')
  }
  i806.sharedMaterials = i808
  i806.receiveShadows = !!i807[4]
  i806.shadowCastingMode = i807[5]
  i806.sortingLayerID = i807[6]
  i806.sortingOrder = i807[7]
  i806.lightmapIndex = i807[8]
  i806.lightmapSceneIndex = i807[9]
  i806.lightmapScaleOffset = new pc.Vec4( i807[10], i807[11], i807[12], i807[13] )
  i806.lightProbeUsage = i807[14]
  i806.reflectionProbeUsage = i807[15]
  request.r(i807[16], i807[17], 0, i806, 'sharedMesh')
  var i811 = i807[18]
  var i810 = []
  for(var i = 0; i < i811.length; i += 2) {
  request.r(i811[i + 0], i811[i + 1], 2, i810, '')
  }
  i806.bones = i810
  i806.updateWhenOffscreen = !!i807[19]
  i806.localBounds = i807[20]
  request.r(i807[21], i807[22], 0, i806, 'rootBone')
  var i813 = i807[23]
  var i812 = []
  for(var i = 0; i < i813.length; i += 1) {
    i812.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i813[i + 0]) );
  }
  i806.blendShapesWeights = i812
  return i806
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i816 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i817 = data
  i816.weight = i817[0]
  return i816
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i818 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i819 = data
  i818.enabled = !!i819[0]
  i818.type = i819[1]
  i818.color = new pc.Color(i819[2], i819[3], i819[4], i819[5])
  i818.cullingMask = i819[6]
  i818.intensity = i819[7]
  i818.range = i819[8]
  i818.spotAngle = i819[9]
  i818.shadows = i819[10]
  i818.shadowNormalBias = i819[11]
  i818.shadowBias = i819[12]
  i818.shadowStrength = i819[13]
  i818.lightmapBakeType = i819[14]
  i818.renderMode = i819[15]
  request.r(i819[16], i819[17], 0, i818, 'cookie')
  i818.cookieSize = i819[18]
  return i818
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i820 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i821 = data
  i820.center = new pc.Vec3( i821[0], i821[1], i821[2] )
  i820.size = new pc.Vec3( i821[3], i821[4], i821[5] )
  i820.enabled = !!i821[6]
  i820.isTrigger = !!i821[7]
  request.r(i821[8], i821[9], 0, i820, 'material')
  return i820
}

Deserializers["PlayerBullet"] = function (request, data, root) {
  var i822 = root || request.c( 'PlayerBullet' )
  var i823 = data
  i822.speed = i823[0]
  return i822
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TrailRenderer"] = function (request, data, root) {
  var i824 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TrailRenderer' )
  var i825 = data
  i824.enabled = !!i825[0]
  request.r(i825[1], i825[2], 0, i824, 'sharedMaterial')
  var i827 = i825[3]
  var i826 = []
  for(var i = 0; i < i827.length; i += 2) {
  request.r(i827[i + 0], i827[i + 1], 2, i826, '')
  }
  i824.sharedMaterials = i826
  i824.receiveShadows = !!i825[4]
  i824.shadowCastingMode = i825[5]
  i824.sortingLayerID = i825[6]
  i824.sortingOrder = i825[7]
  i824.lightmapIndex = i825[8]
  i824.lightmapSceneIndex = i825[9]
  i824.lightmapScaleOffset = new pc.Vec4( i825[10], i825[11], i825[12], i825[13] )
  i824.lightProbeUsage = i825[14]
  i824.reflectionProbeUsage = i825[15]
  var i829 = i825[16]
  var i828 = []
  for(var i = 0; i < i829.length; i += 3) {
    i828.push( new pc.Vec3( i829[i + 0], i829[i + 1], i829[i + 2] ) );
  }
  i824.positions = i828
  i824.positionCount = i825[17]
  i824.time = i825[18]
  i824.startWidth = i825[19]
  i824.endWidth = i825[20]
  i824.widthMultiplier = i825[21]
  i824.autodestruct = !!i825[22]
  i824.emitting = !!i825[23]
  i824.numCornerVertices = i825[24]
  i824.numCapVertices = i825[25]
  i824.minVertexDistance = i825[26]
  i824.colorGradient = i825[27] ? new pc.ColorGradient(i825[27][0], i825[27][1], i825[27][2]) : null
  i824.startColor = new pc.Color(i825[28], i825[29], i825[30], i825[31])
  i824.endColor = new pc.Color(i825[32], i825[33], i825[34], i825[35])
  i824.generateLightingData = !!i825[36]
  i824.textureMode = i825[37]
  i824.alignment = i825[38]
  i824.widthCurve = new pc.AnimationCurve( { keys_flow: i825[39] } )
  return i824
}

Deserializers["BulletController"] = function (request, data, root) {
  var i832 = root || request.c( 'BulletController' )
  var i833 = data
  i832.speed = i833[0]
  return i832
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Rigidbody"] = function (request, data, root) {
  var i834 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Rigidbody' )
  var i835 = data
  i834.mass = i835[0]
  i834.drag = i835[1]
  i834.angularDrag = i835[2]
  i834.useGravity = !!i835[3]
  i834.isKinematic = !!i835[4]
  i834.constraints = i835[5]
  i834.maxAngularVelocity = i835[6]
  i834.collisionDetectionMode = i835[7]
  i834.interpolation = i835[8]
  return i834
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i836 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i837 = data
  i836.enabled = !!i837[0]
  i836.aspect = i837[1]
  i836.orthographic = !!i837[2]
  i836.orthographicSize = i837[3]
  i836.backgroundColor = new pc.Color(i837[4], i837[5], i837[6], i837[7])
  i836.nearClipPlane = i837[8]
  i836.farClipPlane = i837[9]
  i836.fieldOfView = i837[10]
  i836.depth = i837[11]
  i836.clearFlags = i837[12]
  i836.cullingMask = i837[13]
  i836.rect = i837[14]
  request.r(i837[15], i837[16], 0, i836, 'targetTexture')
  return i836
}

Deserializers["CameraController"] = function (request, data, root) {
  var i838 = root || request.c( 'CameraController' )
  var i839 = data
  request.r(i839[0], i839[1], 0, i838, 'target')
  i838.offset = new pc.Vec3( i839[2], i839[3], i839[4] )
  i838.smoothFactor = i839[5]
  return i838
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i840 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i841 = data
  i840.pivot = new pc.Vec2( i841[0], i841[1] )
  i840.anchorMin = new pc.Vec2( i841[2], i841[3] )
  i840.anchorMax = new pc.Vec2( i841[4], i841[5] )
  i840.sizeDelta = new pc.Vec2( i841[6], i841[7] )
  i840.anchoredPosition3D = new pc.Vec3( i841[8], i841[9], i841[10] )
  i840.rotation = new pc.Quat(i841[11], i841[12], i841[13], i841[14])
  i840.scale = new pc.Vec3( i841[15], i841[16], i841[17] )
  return i840
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i842 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i843 = data
  i842.cullTransparentMesh = !!i843[0]
  return i842
}

Deserializers["TMPro.TextMeshPro"] = function (request, data, root) {
  var i844 = root || request.c( 'TMPro.TextMeshPro' )
  var i845 = data
  i844.m_hasFontAssetChanged = !!i845[0]
  request.r(i845[1], i845[2], 0, i844, 'm_renderer')
  i844.m_maskType = i845[3]
  i844._SortingLayerID = i845[4]
  i844._SortingOrder = i845[5]
  i844.m_text = i845[6]
  i844.m_isRightToLeft = !!i845[7]
  request.r(i845[8], i845[9], 0, i844, 'm_fontAsset')
  request.r(i845[10], i845[11], 0, i844, 'm_sharedMaterial')
  var i847 = i845[12]
  var i846 = []
  for(var i = 0; i < i847.length; i += 2) {
  request.r(i847[i + 0], i847[i + 1], 2, i846, '')
  }
  i844.m_fontSharedMaterials = i846
  request.r(i845[13], i845[14], 0, i844, 'm_fontMaterial')
  var i849 = i845[15]
  var i848 = []
  for(var i = 0; i < i849.length; i += 2) {
  request.r(i849[i + 0], i849[i + 1], 2, i848, '')
  }
  i844.m_fontMaterials = i848
  i844.m_fontColor32 = UnityEngine.Color32.ConstructColor(i845[16], i845[17], i845[18], i845[19])
  i844.m_fontColor = new pc.Color(i845[20], i845[21], i845[22], i845[23])
  i844.m_enableVertexGradient = !!i845[24]
  i844.m_colorMode = i845[25]
  i844.m_fontColorGradient = request.d('TMPro.VertexGradient', i845[26], i844.m_fontColorGradient)
  request.r(i845[27], i845[28], 0, i844, 'm_fontColorGradientPreset')
  request.r(i845[29], i845[30], 0, i844, 'm_spriteAsset')
  i844.m_tintAllSprites = !!i845[31]
  request.r(i845[32], i845[33], 0, i844, 'm_StyleSheet')
  i844.m_TextStyleHashCode = i845[34]
  i844.m_overrideHtmlColors = !!i845[35]
  i844.m_faceColor = UnityEngine.Color32.ConstructColor(i845[36], i845[37], i845[38], i845[39])
  i844.m_fontSize = i845[40]
  i844.m_fontSizeBase = i845[41]
  i844.m_fontWeight = i845[42]
  i844.m_enableAutoSizing = !!i845[43]
  i844.m_fontSizeMin = i845[44]
  i844.m_fontSizeMax = i845[45]
  i844.m_fontStyle = i845[46]
  i844.m_HorizontalAlignment = i845[47]
  i844.m_VerticalAlignment = i845[48]
  i844.m_textAlignment = i845[49]
  i844.m_characterSpacing = i845[50]
  i844.m_wordSpacing = i845[51]
  i844.m_lineSpacing = i845[52]
  i844.m_lineSpacingMax = i845[53]
  i844.m_paragraphSpacing = i845[54]
  i844.m_charWidthMaxAdj = i845[55]
  i844.m_enableWordWrapping = !!i845[56]
  i844.m_wordWrappingRatios = i845[57]
  i844.m_overflowMode = i845[58]
  request.r(i845[59], i845[60], 0, i844, 'm_linkedTextComponent')
  request.r(i845[61], i845[62], 0, i844, 'parentLinkedComponent')
  i844.m_enableKerning = !!i845[63]
  i844.m_enableExtraPadding = !!i845[64]
  i844.checkPaddingRequired = !!i845[65]
  i844.m_isRichText = !!i845[66]
  i844.m_parseCtrlCharacters = !!i845[67]
  i844.m_isOrthographic = !!i845[68]
  i844.m_isCullingEnabled = !!i845[69]
  i844.m_horizontalMapping = i845[70]
  i844.m_verticalMapping = i845[71]
  i844.m_uvLineOffset = i845[72]
  i844.m_geometrySortingOrder = i845[73]
  i844.m_IsTextObjectScaleStatic = !!i845[74]
  i844.m_VertexBufferAutoSizeReduction = !!i845[75]
  i844.m_useMaxVisibleDescender = !!i845[76]
  i844.m_pageToDisplay = i845[77]
  i844.m_margin = new pc.Vec4( i845[78], i845[79], i845[80], i845[81] )
  i844.m_isUsingLegacyAnimationComponent = !!i845[82]
  i844.m_isVolumetricText = !!i845[83]
  request.r(i845[84], i845[85], 0, i844, 'm_Material')
  i844.m_Maskable = !!i845[86]
  i844.m_Color = new pc.Color(i845[87], i845[88], i845[89], i845[90])
  i844.m_RaycastTarget = !!i845[91]
  return i844
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i850 = root || request.c( 'TMPro.VertexGradient' )
  var i851 = data
  i850.topLeft = new pc.Color(i851[0], i851[1], i851[2], i851[3])
  i850.topRight = new pc.Color(i851[4], i851[5], i851[6], i851[7])
  i850.bottomLeft = new pc.Color(i851[8], i851[9], i851[10], i851[11])
  i850.bottomRight = new pc.Color(i851[12], i851[13], i851[14], i851[15])
  return i850
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i852 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i853 = data
  i852.hashCode = i853[0]
  request.r(i853[1], i853[2], 0, i852, 'material')
  i852.materialHashCode = i853[3]
  request.r(i853[4], i853[5], 0, i852, 'atlas')
  i852.normalStyle = i853[6]
  i852.normalSpacingOffset = i853[7]
  i852.boldStyle = i853[8]
  i852.boldSpacing = i853[9]
  i852.italicStyle = i853[10]
  i852.tabSize = i853[11]
  i852.m_Version = i853[12]
  i852.m_SourceFontFileGUID = i853[13]
  request.r(i853[14], i853[15], 0, i852, 'm_SourceFontFile_EditorRef')
  request.r(i853[16], i853[17], 0, i852, 'm_SourceFontFile')
  i852.m_AtlasPopulationMode = i853[18]
  i852.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i853[19], i852.m_FaceInfo)
  var i855 = i853[20]
  var i854 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i855.length; i += 1) {
    i854.add(request.d('UnityEngine.TextCore.Glyph', i855[i + 0]));
  }
  i852.m_GlyphTable = i854
  var i857 = i853[21]
  var i856 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i857.length; i += 1) {
    i856.add(request.d('TMPro.TMP_Character', i857[i + 0]));
  }
  i852.m_CharacterTable = i856
  var i859 = i853[22]
  var i858 = []
  for(var i = 0; i < i859.length; i += 2) {
  request.r(i859[i + 0], i859[i + 1], 2, i858, '')
  }
  i852.m_AtlasTextures = i858
  i852.m_AtlasTextureIndex = i853[23]
  i852.m_IsMultiAtlasTexturesEnabled = !!i853[24]
  var i861 = i853[25]
  var i860 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i861.length; i += 1) {
    i860.add(request.d('UnityEngine.TextCore.GlyphRect', i861[i + 0]));
  }
  i852.m_UsedGlyphRects = i860
  var i863 = i853[26]
  var i862 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i863.length; i += 1) {
    i862.add(request.d('UnityEngine.TextCore.GlyphRect', i863[i + 0]));
  }
  i852.m_FreeGlyphRects = i862
  i852.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i853[27], i852.m_fontInfo)
  i852.m_AtlasWidth = i853[28]
  i852.m_AtlasHeight = i853[29]
  i852.m_AtlasPadding = i853[30]
  i852.m_AtlasRenderMode = i853[31]
  var i865 = i853[32]
  var i864 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i865.length; i += 1) {
    i864.add(request.d('TMPro.TMP_Glyph', i865[i + 0]));
  }
  i852.m_glyphInfoList = i864
  i852.m_KerningTable = request.d('TMPro.KerningTable', i853[33], i852.m_KerningTable)
  i852.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i853[34], i852.m_FontFeatureTable)
  var i867 = i853[35]
  var i866 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i867.length; i += 2) {
  request.r(i867[i + 0], i867[i + 1], 1, i866, '')
  }
  i852.fallbackFontAssets = i866
  var i869 = i853[36]
  var i868 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i869.length; i += 2) {
  request.r(i869[i + 0], i869[i + 1], 1, i868, '')
  }
  i852.m_FallbackFontAssetTable = i868
  i852.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i853[37], i852.m_CreationSettings)
  var i871 = i853[38]
  var i870 = []
  for(var i = 0; i < i871.length; i += 1) {
    i870.push( request.d('TMPro.TMP_FontWeightPair', i871[i + 0]) );
  }
  i852.m_FontWeightTable = i870
  var i873 = i853[39]
  var i872 = []
  for(var i = 0; i < i873.length; i += 1) {
    i872.push( request.d('TMPro.TMP_FontWeightPair', i873[i + 0]) );
  }
  i852.fontWeights = i872
  return i852
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i874 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i875 = data
  i874.m_FamilyName = i875[0]
  i874.m_StyleName = i875[1]
  i874.m_PointSize = i875[2]
  i874.m_Scale = i875[3]
  i874.m_LineHeight = i875[4]
  i874.m_AscentLine = i875[5]
  i874.m_CapLine = i875[6]
  i874.m_MeanLine = i875[7]
  i874.m_Baseline = i875[8]
  i874.m_DescentLine = i875[9]
  i874.m_SuperscriptOffset = i875[10]
  i874.m_SuperscriptSize = i875[11]
  i874.m_SubscriptOffset = i875[12]
  i874.m_SubscriptSize = i875[13]
  i874.m_UnderlineOffset = i875[14]
  i874.m_UnderlineThickness = i875[15]
  i874.m_StrikethroughOffset = i875[16]
  i874.m_StrikethroughThickness = i875[17]
  i874.m_TabWidth = i875[18]
  return i874
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i878 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i879 = data
  i878.m_Index = i879[0]
  i878.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i879[1], i878.m_Metrics)
  i878.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i879[2], i878.m_GlyphRect)
  i878.m_Scale = i879[3]
  i878.m_AtlasIndex = i879[4]
  return i878
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i880 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i881 = data
  i880.m_Width = i881[0]
  i880.m_Height = i881[1]
  i880.m_HorizontalBearingX = i881[2]
  i880.m_HorizontalBearingY = i881[3]
  i880.m_HorizontalAdvance = i881[4]
  return i880
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i882 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i883 = data
  i882.m_X = i883[0]
  i882.m_Y = i883[1]
  i882.m_Width = i883[2]
  i882.m_Height = i883[3]
  return i882
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i886 = root || request.c( 'TMPro.TMP_Character' )
  var i887 = data
  i886.m_ElementType = i887[0]
  i886.m_Unicode = i887[1]
  i886.m_GlyphIndex = i887[2]
  i886.m_Scale = i887[3]
  return i886
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i892 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i893 = data
  i892.Name = i893[0]
  i892.PointSize = i893[1]
  i892.Scale = i893[2]
  i892.CharacterCount = i893[3]
  i892.LineHeight = i893[4]
  i892.Baseline = i893[5]
  i892.Ascender = i893[6]
  i892.CapHeight = i893[7]
  i892.Descender = i893[8]
  i892.CenterLine = i893[9]
  i892.SuperscriptOffset = i893[10]
  i892.SubscriptOffset = i893[11]
  i892.SubSize = i893[12]
  i892.Underline = i893[13]
  i892.UnderlineThickness = i893[14]
  i892.strikethrough = i893[15]
  i892.strikethroughThickness = i893[16]
  i892.TabWidth = i893[17]
  i892.Padding = i893[18]
  i892.AtlasWidth = i893[19]
  i892.AtlasHeight = i893[20]
  return i892
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i896 = root || request.c( 'TMPro.TMP_Glyph' )
  var i897 = data
  i896.id = i897[0]
  i896.x = i897[1]
  i896.y = i897[2]
  i896.width = i897[3]
  i896.height = i897[4]
  i896.xOffset = i897[5]
  i896.yOffset = i897[6]
  i896.xAdvance = i897[7]
  i896.scale = i897[8]
  return i896
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i898 = root || request.c( 'TMPro.KerningTable' )
  var i899 = data
  var i901 = i899[0]
  var i900 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i901.length; i += 1) {
    i900.add(request.d('TMPro.KerningPair', i901[i + 0]));
  }
  i898.kerningPairs = i900
  return i898
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i904 = root || request.c( 'TMPro.KerningPair' )
  var i905 = data
  i904.xOffset = i905[0]
  i904.m_FirstGlyph = i905[1]
  i904.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i905[2], i904.m_FirstGlyphAdjustments)
  i904.m_SecondGlyph = i905[3]
  i904.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i905[4], i904.m_SecondGlyphAdjustments)
  i904.m_IgnoreSpacingAdjustments = !!i905[5]
  return i904
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i906 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i907 = data
  var i909 = i907[0]
  var i908 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i909.length; i += 1) {
    i908.add(request.d('TMPro.TMP_GlyphPairAdjustmentRecord', i909[i + 0]));
  }
  i906.m_GlyphPairAdjustmentRecords = i908
  return i906
}

Deserializers["TMPro.TMP_GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i912 = root || request.c( 'TMPro.TMP_GlyphPairAdjustmentRecord' )
  var i913 = data
  i912.m_FirstAdjustmentRecord = request.d('TMPro.TMP_GlyphAdjustmentRecord', i913[0], i912.m_FirstAdjustmentRecord)
  i912.m_SecondAdjustmentRecord = request.d('TMPro.TMP_GlyphAdjustmentRecord', i913[1], i912.m_SecondAdjustmentRecord)
  i912.m_FeatureLookupFlags = i913[2]
  return i912
}

Deserializers["TMPro.TMP_GlyphAdjustmentRecord"] = function (request, data, root) {
  var i914 = root || request.c( 'TMPro.TMP_GlyphAdjustmentRecord' )
  var i915 = data
  i914.m_GlyphIndex = i915[0]
  i914.m_GlyphValueRecord = request.d('TMPro.TMP_GlyphValueRecord', i915[1], i914.m_GlyphValueRecord)
  return i914
}

Deserializers["TMPro.TMP_GlyphValueRecord"] = function (request, data, root) {
  var i916 = root || request.c( 'TMPro.TMP_GlyphValueRecord' )
  var i917 = data
  i916.m_XPlacement = i917[0]
  i916.m_YPlacement = i917[1]
  i916.m_XAdvance = i917[2]
  i916.m_YAdvance = i917[3]
  return i916
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i920 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i921 = data
  i920.sourceFontFileName = i921[0]
  i920.sourceFontFileGUID = i921[1]
  i920.pointSizeSamplingMode = i921[2]
  i920.pointSize = i921[3]
  i920.padding = i921[4]
  i920.packingMode = i921[5]
  i920.atlasWidth = i921[6]
  i920.atlasHeight = i921[7]
  i920.characterSetSelectionMode = i921[8]
  i920.characterSequence = i921[9]
  i920.referencedFontAssetGUID = i921[10]
  i920.referencedTextAssetGUID = i921[11]
  i920.fontStyle = i921[12]
  i920.fontStyleModifier = i921[13]
  i920.renderMode = i921[14]
  i920.includeFontFeatures = !!i921[15]
  return i920
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i924 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i925 = data
  request.r(i925[0], i925[1], 0, i924, 'regularTypeface')
  request.r(i925[2], i925[3], 0, i924, 'italicTypeface')
  return i924
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i926 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i927 = data
  i926.center = new pc.Vec3( i927[0], i927[1], i927[2] )
  i926.radius = i927[3]
  i926.height = i927[4]
  i926.direction = i927[5]
  i926.enabled = !!i927[6]
  i926.isTrigger = !!i927[7]
  request.r(i927[8], i927[9], 0, i926, 'material')
  return i926
}

Deserializers["Farmable"] = function (request, data, root) {
  var i928 = root || request.c( 'Farmable' )
  var i929 = data
  i928.resourceStatus = i929[0]
  i928.resourceType = i929[1]
  i928.magnetRange = i929[2]
  i928.sourceHealth = i929[3]
  return i928
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i930 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i931 = data
  i930.enabled = !!i931[0]
  i930.isTrigger = !!i931[1]
  request.r(i931[2], i931[3], 0, i930, 'material')
  request.r(i931[4], i931[5], 0, i930, 'sharedMesh')
  i930.convex = !!i931[6]
  return i930
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i932 = root || request.c( 'UnityEngine.UI.Image' )
  var i933 = data
  request.r(i933[0], i933[1], 0, i932, 'm_Sprite')
  i932.m_Type = i933[2]
  i932.m_PreserveAspect = !!i933[3]
  i932.m_FillCenter = !!i933[4]
  i932.m_FillMethod = i933[5]
  i932.m_FillAmount = i933[6]
  i932.m_FillClockwise = !!i933[7]
  i932.m_FillOrigin = i933[8]
  i932.m_UseSpriteMesh = !!i933[9]
  i932.m_PixelsPerUnitMultiplier = i933[10]
  request.r(i933[11], i933[12], 0, i932, 'm_Material')
  i932.m_Maskable = !!i933[13]
  i932.m_Color = new pc.Color(i933[14], i933[15], i933[16], i933[17])
  i932.m_RaycastTarget = !!i933[18]
  return i932
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i934 = root || request.c( 'UnityEngine.UI.Button' )
  var i935 = data
  i934.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i935[0], i934.m_OnClick)
  i934.m_Navigation = request.d('UnityEngine.UI.Navigation', i935[1], i934.m_Navigation)
  i934.m_Transition = i935[2]
  i934.m_Colors = request.d('UnityEngine.UI.ColorBlock', i935[3], i934.m_Colors)
  i934.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i935[4], i934.m_SpriteState)
  i934.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i935[5], i934.m_AnimationTriggers)
  i934.m_Interactable = !!i935[6]
  request.r(i935[7], i935[8], 0, i934, 'm_TargetGraphic')
  return i934
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i936 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i937 = data
  i936.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i937[0], i936.m_PersistentCalls)
  return i936
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i938 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i939 = data
  var i941 = i939[0]
  var i940 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i941.length; i += 1) {
    i940.add(request.d('UnityEngine.Events.PersistentCall', i941[i + 0]));
  }
  i938.m_Calls = i940
  return i938
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i944 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i945 = data
  request.r(i945[0], i945[1], 0, i944, 'm_Target')
  i944.m_MethodName = i945[2]
  i944.m_Mode = i945[3]
  i944.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i945[4], i944.m_Arguments)
  i944.m_CallState = i945[5]
  return i944
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i946 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i947 = data
  i946.m_Mode = i947[0]
  request.r(i947[1], i947[2], 0, i946, 'm_SelectOnUp')
  request.r(i947[3], i947[4], 0, i946, 'm_SelectOnDown')
  request.r(i947[5], i947[6], 0, i946, 'm_SelectOnLeft')
  request.r(i947[7], i947[8], 0, i946, 'm_SelectOnRight')
  return i946
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i948 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i949 = data
  i948.m_NormalColor = new pc.Color(i949[0], i949[1], i949[2], i949[3])
  i948.m_HighlightedColor = new pc.Color(i949[4], i949[5], i949[6], i949[7])
  i948.m_PressedColor = new pc.Color(i949[8], i949[9], i949[10], i949[11])
  i948.m_SelectedColor = new pc.Color(i949[12], i949[13], i949[14], i949[15])
  i948.m_DisabledColor = new pc.Color(i949[16], i949[17], i949[18], i949[19])
  i948.m_ColorMultiplier = i949[20]
  i948.m_FadeDuration = i949[21]
  return i948
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i950 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i951 = data
  request.r(i951[0], i951[1], 0, i950, 'm_HighlightedSprite')
  request.r(i951[2], i951[3], 0, i950, 'm_PressedSprite')
  request.r(i951[4], i951[5], 0, i950, 'm_SelectedSprite')
  request.r(i951[6], i951[7], 0, i950, 'm_DisabledSprite')
  return i950
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i952 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i953 = data
  i952.m_NormalTrigger = i953[0]
  i952.m_HighlightedTrigger = i953[1]
  i952.m_PressedTrigger = i953[2]
  i952.m_SelectedTrigger = i953[3]
  i952.m_DisabledTrigger = i953[4]
  return i952
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i954 = root || request.c( 'UnityEngine.UI.Mask' )
  var i955 = data
  i954.m_ShowMaskGraphic = !!i955[0]
  return i954
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i956 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i957 = data
  i956.m_hasFontAssetChanged = !!i957[0]
  request.r(i957[1], i957[2], 0, i956, 'm_baseMaterial')
  i956.m_maskOffset = new pc.Vec4( i957[3], i957[4], i957[5], i957[6] )
  i956.m_text = i957[7]
  i956.m_isRightToLeft = !!i957[8]
  request.r(i957[9], i957[10], 0, i956, 'm_fontAsset')
  request.r(i957[11], i957[12], 0, i956, 'm_sharedMaterial')
  var i959 = i957[13]
  var i958 = []
  for(var i = 0; i < i959.length; i += 2) {
  request.r(i959[i + 0], i959[i + 1], 2, i958, '')
  }
  i956.m_fontSharedMaterials = i958
  request.r(i957[14], i957[15], 0, i956, 'm_fontMaterial')
  var i961 = i957[16]
  var i960 = []
  for(var i = 0; i < i961.length; i += 2) {
  request.r(i961[i + 0], i961[i + 1], 2, i960, '')
  }
  i956.m_fontMaterials = i960
  i956.m_fontColor32 = UnityEngine.Color32.ConstructColor(i957[17], i957[18], i957[19], i957[20])
  i956.m_fontColor = new pc.Color(i957[21], i957[22], i957[23], i957[24])
  i956.m_enableVertexGradient = !!i957[25]
  i956.m_colorMode = i957[26]
  i956.m_fontColorGradient = request.d('TMPro.VertexGradient', i957[27], i956.m_fontColorGradient)
  request.r(i957[28], i957[29], 0, i956, 'm_fontColorGradientPreset')
  request.r(i957[30], i957[31], 0, i956, 'm_spriteAsset')
  i956.m_tintAllSprites = !!i957[32]
  request.r(i957[33], i957[34], 0, i956, 'm_StyleSheet')
  i956.m_TextStyleHashCode = i957[35]
  i956.m_overrideHtmlColors = !!i957[36]
  i956.m_faceColor = UnityEngine.Color32.ConstructColor(i957[37], i957[38], i957[39], i957[40])
  i956.m_fontSize = i957[41]
  i956.m_fontSizeBase = i957[42]
  i956.m_fontWeight = i957[43]
  i956.m_enableAutoSizing = !!i957[44]
  i956.m_fontSizeMin = i957[45]
  i956.m_fontSizeMax = i957[46]
  i956.m_fontStyle = i957[47]
  i956.m_HorizontalAlignment = i957[48]
  i956.m_VerticalAlignment = i957[49]
  i956.m_textAlignment = i957[50]
  i956.m_characterSpacing = i957[51]
  i956.m_wordSpacing = i957[52]
  i956.m_lineSpacing = i957[53]
  i956.m_lineSpacingMax = i957[54]
  i956.m_paragraphSpacing = i957[55]
  i956.m_charWidthMaxAdj = i957[56]
  i956.m_enableWordWrapping = !!i957[57]
  i956.m_wordWrappingRatios = i957[58]
  i956.m_overflowMode = i957[59]
  request.r(i957[60], i957[61], 0, i956, 'm_linkedTextComponent')
  request.r(i957[62], i957[63], 0, i956, 'parentLinkedComponent')
  i956.m_enableKerning = !!i957[64]
  i956.m_enableExtraPadding = !!i957[65]
  i956.checkPaddingRequired = !!i957[66]
  i956.m_isRichText = !!i957[67]
  i956.m_parseCtrlCharacters = !!i957[68]
  i956.m_isOrthographic = !!i957[69]
  i956.m_isCullingEnabled = !!i957[70]
  i956.m_horizontalMapping = i957[71]
  i956.m_verticalMapping = i957[72]
  i956.m_uvLineOffset = i957[73]
  i956.m_geometrySortingOrder = i957[74]
  i956.m_IsTextObjectScaleStatic = !!i957[75]
  i956.m_VertexBufferAutoSizeReduction = !!i957[76]
  i956.m_useMaxVisibleDescender = !!i957[77]
  i956.m_pageToDisplay = i957[78]
  i956.m_margin = new pc.Vec4( i957[79], i957[80], i957[81], i957[82] )
  i956.m_isUsingLegacyAnimationComponent = !!i957[83]
  i956.m_isVolumetricText = !!i957[84]
  request.r(i957[85], i957[86], 0, i956, 'm_Material')
  i956.m_Maskable = !!i957[87]
  i956.m_Color = new pc.Color(i957[88], i957[89], i957[90], i957[91])
  i956.m_RaycastTarget = !!i957[92]
  return i956
}

Deserializers["PanelSharkWorlds"] = function (request, data, root) {
  var i962 = root || request.c( 'PanelSharkWorlds' )
  var i963 = data
  request.r(i963[0], i963[1], 0, i962, 'sharkWorldItem')
  request.r(i963[2], i963[3], 0, i962, 'sharkProgressItem')
  request.r(i963[4], i963[5], 0, i962, 'content')
  var i965 = i963[6]
  var i964 = []
  for(var i = 0; i < i965.length; i += 2) {
  request.r(i965[i + 0], i965[i + 1], 2, i964, '')
  }
  i962.sharkWorlds = i964
  i962.worldCount = i963[7]
  i962.equippedIndex = i963[8]
  i962.currentLevel = i963[9]
  i962.maxLevelCompleted = i963[10]
  var i967 = i963[11]
  var i966 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Sprite')))
  for(var i = 0; i < i967.length; i += 2) {
  request.r(i967[i + 0], i967[i + 1], 1, i966, '')
  }
  i962.worldImages = i966
  return i962
}

Deserializers["UnityEngine.UI.ScrollRect"] = function (request, data, root) {
  var i972 = root || request.c( 'UnityEngine.UI.ScrollRect' )
  var i973 = data
  request.r(i973[0], i973[1], 0, i972, 'm_Content')
  i972.m_Horizontal = !!i973[2]
  i972.m_Vertical = !!i973[3]
  i972.m_MovementType = i973[4]
  i972.m_Elasticity = i973[5]
  i972.m_Inertia = !!i973[6]
  i972.m_DecelerationRate = i973[7]
  i972.m_ScrollSensitivity = i973[8]
  request.r(i973[9], i973[10], 0, i972, 'm_Viewport')
  request.r(i973[11], i973[12], 0, i972, 'm_HorizontalScrollbar')
  request.r(i973[13], i973[14], 0, i972, 'm_VerticalScrollbar')
  i972.m_HorizontalScrollbarVisibility = i973[15]
  i972.m_VerticalScrollbarVisibility = i973[16]
  i972.m_HorizontalScrollbarSpacing = i973[17]
  i972.m_VerticalScrollbarSpacing = i973[18]
  i972.m_OnValueChanged = request.d('UnityEngine.UI.ScrollRect+ScrollRectEvent', i973[19], i972.m_OnValueChanged)
  return i972
}

Deserializers["UnityEngine.UI.ScrollRect+ScrollRectEvent"] = function (request, data, root) {
  var i974 = root || request.c( 'UnityEngine.UI.ScrollRect+ScrollRectEvent' )
  var i975 = data
  i974.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i975[0], i974.m_PersistentCalls)
  return i974
}

Deserializers["UnityEngine.UI.VerticalLayoutGroup"] = function (request, data, root) {
  var i976 = root || request.c( 'UnityEngine.UI.VerticalLayoutGroup' )
  var i977 = data
  i976.m_Spacing = i977[0]
  i976.m_ChildForceExpandWidth = !!i977[1]
  i976.m_ChildForceExpandHeight = !!i977[2]
  i976.m_ChildControlWidth = !!i977[3]
  i976.m_ChildControlHeight = !!i977[4]
  i976.m_ChildScaleWidth = !!i977[5]
  i976.m_ChildScaleHeight = !!i977[6]
  i976.m_Padding = UnityEngine.RectOffset.FromPaddings(i977[7], i977[8], i977[9], i977[10])
  i976.m_ChildAlignment = i977[11]
  return i976
}

Deserializers["UnityEngine.UI.ContentSizeFitter"] = function (request, data, root) {
  var i978 = root || request.c( 'UnityEngine.UI.ContentSizeFitter' )
  var i979 = data
  i978.m_HorizontalFit = i979[0]
  i978.m_VerticalFit = i979[1]
  return i978
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i980 = root || request.c( 'UnityEngine.UI.Text' )
  var i981 = data
  i980.m_FontData = request.d('UnityEngine.UI.FontData', i981[0], i980.m_FontData)
  i980.m_Text = i981[1]
  request.r(i981[2], i981[3], 0, i980, 'm_Material')
  i980.m_Maskable = !!i981[4]
  i980.m_Color = new pc.Color(i981[5], i981[6], i981[7], i981[8])
  i980.m_RaycastTarget = !!i981[9]
  return i980
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i982 = root || request.c( 'UnityEngine.UI.FontData' )
  var i983 = data
  request.r(i983[0], i983[1], 0, i982, 'm_Font')
  i982.m_FontSize = i983[2]
  i982.m_FontStyle = i983[3]
  i982.m_BestFit = !!i983[4]
  i982.m_MinSize = i983[5]
  i982.m_MaxSize = i983[6]
  i982.m_Alignment = i983[7]
  i982.m_AlignByGeometry = !!i983[8]
  i982.m_RichText = !!i983[9]
  i982.m_HorizontalOverflow = i983[10]
  i982.m_VerticalOverflow = i983[11]
  i982.m_LineSpacing = i983[12]
  return i982
}

Deserializers["SharkWorldItem"] = function (request, data, root) {
  var i984 = root || request.c( 'SharkWorldItem' )
  var i985 = data
  request.r(i985[0], i985[1], 0, i984, 'btnEquip')
  request.r(i985[2], i985[3], 0, i984, 'imgProdImage')
  request.r(i985[4], i985[5], 0, i984, 'lockImage')
  request.r(i985[6], i985[7], 0, i984, 'txtWorldName')
  var i987 = i985[8]
  var i986 = new (System.Collections.Generic.List$1(Bridge.ns('SharkWorldProgressItem')))
  for(var i = 0; i < i987.length; i += 2) {
  request.r(i987[i + 0], i987[i + 1], 1, i986, '')
  }
  i984.progressItems = i986
  return i984
}

Deserializers["SharkWorldProgressItem"] = function (request, data, root) {
  var i990 = root || request.c( 'SharkWorldProgressItem' )
  var i991 = data
  request.r(i991[0], i991[1], 0, i990, 'txtClearLevel')
  request.r(i991[2], i991[3], 0, i990, 'txtProgress')
  request.r(i991[4], i991[5], 0, i990, 'txtRewardAmount1')
  request.r(i991[6], i991[7], 0, i990, 'txtRewardAmount2')
  request.r(i991[8], i991[9], 0, i990, 'imgItem1')
  request.r(i991[10], i991[11], 0, i990, 'imgItem2')
  request.r(i991[12], i991[13], 0, i990, 'imgFillImage')
  request.r(i991[14], i991[15], 0, i990, 'btnClick')
  request.r(i991[16], i991[17], 0, i990, 'clamiedImg')
  return i990
}

Deserializers["PanelCTA_UI"] = function (request, data, root) {
  var i992 = root || request.c( 'PanelCTA_UI' )
  var i993 = data
  request.r(i993[0], i993[1], 0, i992, 'btnDownload')
  request.r(i993[2], i993[3], 0, i992, 'btnRetry')
  return i992
}

Deserializers["BotController"] = function (request, data, root) {
  var i994 = root || request.c( 'BotController' )
  var i995 = data
  i994.bc = i995[0]
  i994.damage = i995[1]
  var i997 = i995[2]
  var i996 = []
  for(var i = 0; i < i997.length; i += 2) {
  request.r(i997[i + 0], i997[i + 1], 2, i996, '')
  }
  i994.bulletTypes = i996
  request.r(i995[3], i995[4], 0, i994, 'target')
  i994.lookRadius = i995[5]
  i994.shootRadius = i995[6]
  i994.health = i995[7]
  i994.canAttack = !!i995[8]
  i994.attacked = !!i995[9]
  i994.dead = !!i995[10]
  i994.moveSpeed = i995[11]
  request.r(i995[12], i995[13], 0, i994, 'firePoint')
  i994.shootDelay = i995[14]
  i994.shootDelayMax = i995[15]
  request.r(i995[16], i995[17], 0, i994, 'ray')
  i994.cloneLevel = i995[18]
  request.r(i995[19], i995[20], 0, i994, 'bombPrefab')
  i994.bombRadius = i995[21]
  i994.bombDelay = i995[22]
  i994.bombDelayMax = i995[23]
  return i994
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i1000 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i1001 = data
  i1000.enabled = !!i1001[0]
  i1000.isTrigger = !!i1001[1]
  request.r(i1001[2], i1001[3], 0, i1000, 'material')
  i1000.center = new pc.Vec3( i1001[4], i1001[5], i1001[6] )
  i1000.radius = i1001[7]
  return i1000
}

Deserializers["BombController"] = function (request, data, root) {
  var i1002 = root || request.c( 'BombController' )
  var i1003 = data
  i1002.speed = i1003[0]
  i1002.upForce = i1003[1]
  request.r(i1003[2], i1003[3], 0, i1002, 'rb')
  return i1002
}

Deserializers["GameManager"] = function (request, data, root) {
  var i1004 = root || request.c( 'GameManager' )
  var i1005 = data
  i1004.gameOverPanelStatus = i1005[0]
  i1004.difficulty = i1005[1]
  i1004.startGame = !!i1005[2]
  i1004.victory = !!i1005[3]
  request.r(i1005[4], i1005[5], 0, i1004, 'player')
  request.r(i1005[6], i1005[7], 0, i1004, 'playerCon')
  request.r(i1005[8], i1005[9], 0, i1004, 'botSpawner')
  request.r(i1005[10], i1005[11], 0, i1004, 'endCamPos')
  request.r(i1005[12], i1005[13], 0, i1004, 'mainCam')
  i1004.totalCoin = i1005[14]
  request.r(i1005[15], i1005[16], 0, i1004, 'coinPrefab')
  i1004.totalWood = i1005[17]
  i1004.ingameWoodCount = i1005[18]
  i1004.totalGold = i1005[19]
  i1004.totalSilver = i1005[20]
  i1004.totalDiamond = i1005[21]
  request.r(i1005[22], i1005[23], 0, i1004, 'tapFX')
  request.r(i1005[24], i1005[25], 0, i1004, 'popFX')
  request.r(i1005[26], i1005[27], 0, i1004, 'hitFX')
  request.r(i1005[28], i1005[29], 0, i1004, 'hitTreeFX')
  request.r(i1005[30], i1005[31], 0, i1004, 'hitGoldFX')
  request.r(i1005[32], i1005[33], 0, i1004, 'hitSilverFX')
  request.r(i1005[34], i1005[35], 0, i1004, 'hitDiamondFX')
  request.r(i1005[36], i1005[37], 0, i1004, 'portalPrefab')
  request.r(i1005[38], i1005[39], 0, i1004, 'dmgTextPopupPrefab')
  request.r(i1005[40], i1005[41], 0, i1004, 'woodPlusTextPopupPrefab')
  var i1007 = i1005[42]
  var i1006 = []
  for(var i = 0; i < i1007.length; i += 2) {
  request.r(i1007[i + 0], i1007[i + 1], 2, i1006, '')
  }
  i1004.confettiFX = i1006
  i1004.worldID = i1005[43]
  i1004.levelID = i1005[44]
  i1004.botsKilled = i1005[45]
  i1004.botsToKill = i1005[46]
  var i1009 = i1005[47]
  var i1008 = []
  for(var i = 0; i < i1009.length; i += 2) {
  request.r(i1009[i + 0], i1009[i + 1], 2, i1008, '')
  }
  i1004.environments = i1008
  var i1011 = i1005[48]
  var i1010 = []
  for(var i = 0; i < i1011.length; i += 2) {
  request.r(i1011[i + 0], i1011[i + 1], 2, i1010, '')
  }
  i1004.ground = i1010
  var i1013 = i1005[49]
  var i1012 = []
  for(var i = 0; i < i1013.length; i += 2) {
  request.r(i1013[i + 0], i1013[i + 1], 2, i1012, '')
  }
  i1004.groundMats = i1012
  i1004.gameLevel = i1005[50]
  request.r(i1005[51], i1005[52], 0, i1004, 'woodPickupPrefab')
  request.r(i1005[53], i1005[54], 0, i1004, 'woodLogPrefab')
  var i1015 = i1005[55]
  var i1014 = []
  for(var i = 0; i < i1015.length; i += 2) {
  request.r(i1015[i + 0], i1015[i + 1], 2, i1014, '')
  }
  i1004.resourcePickupPrefabs = i1014
  var i1017 = i1005[56]
  var i1016 = []
  for(var i = 0; i < i1017.length; i += 2) {
  request.r(i1017[i + 0], i1017[i + 1], 2, i1016, '')
  }
  i1004.resourcePickup5StacksPrefabs = i1016
  var i1019 = i1005[57]
  var i1018 = []
  for(var i = 0; i < i1019.length; i += 2) {
  request.r(i1019[i + 0], i1019[i + 1], 2, i1018, '')
  }
  i1004.arrows = i1018
  return i1004
}

Deserializers["UIManager"] = function (request, data, root) {
  var i1020 = root || request.c( 'UIManager' )
  var i1021 = data
  request.r(i1021[0], i1021[1], 0, i1020, 'panelCTA')
  request.r(i1021[2], i1021[3], 0, i1020, 'btnDownload')
  request.r(i1021[4], i1021[5], 0, i1020, 'gamePanel')
  request.r(i1021[6], i1021[7], 0, i1020, 'gameOverPanel')
  request.r(i1021[8], i1021[9], 0, i1020, 'levelCompletePanel')
  request.r(i1021[10], i1021[11], 0, i1020, 'retryBtn')
  request.r(i1021[12], i1021[13], 0, i1020, 'nextBtn')
  request.r(i1021[14], i1021[15], 0, i1020, 'homeBtn')
  request.r(i1021[16], i1021[17], 0, i1020, 'retryHomeBtn')
  request.r(i1021[18], i1021[19], 0, i1020, 'gameoverLosePanel')
  request.r(i1021[20], i1021[21], 0, i1020, 'gameoverWinPanel')
  request.r(i1021[22], i1021[23], 0, i1020, 'btnLoseNext')
  request.r(i1021[24], i1021[25], 0, i1020, 'btnWinNext')
  request.r(i1021[26], i1021[27], 0, i1020, 'healthBar')
  request.r(i1021[28], i1021[29], 0, i1020, 'levelProgBar')
  request.r(i1021[30], i1021[31], 0, i1020, 'startPanel')
  request.r(i1021[32], i1021[33], 0, i1020, 'playBtn')
  request.r(i1021[34], i1021[35], 0, i1020, 'txtLevel')
  request.r(i1021[36], i1021[37], 0, i1020, 'txtWorld')
  request.r(i1021[38], i1021[39], 0, i1020, 'txtCoin')
  request.r(i1021[40], i1021[41], 0, i1020, 'txtWood')
  request.r(i1021[42], i1021[43], 0, i1020, 'txtHowtoPlay')
  i1020.howtoPlayTapped = !!i1021[44]
  request.r(i1021[45], i1021[46], 0, i1020, 'txtLevelGamePanel')
  request.r(i1021[47], i1021[48], 0, i1020, 'txtWorldGamePanel')
  request.r(i1021[49], i1021[50], 0, i1020, 'txtWoodCountInGame')
  request.r(i1021[51], i1021[52], 0, i1020, 'tutorial')
  request.r(i1021[53], i1021[54], 0, i1020, 'sharkWorldPanel')
  request.r(i1021[55], i1021[56], 0, i1020, 'sharkWorldBtn')
  request.r(i1021[57], i1021[58], 0, i1020, 'UICanvas')
  var i1023 = i1021[59]
  var i1022 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Sprite')))
  for(var i = 0; i < i1023.length; i += 2) {
  request.r(i1023[i + 0], i1023[i + 1], 1, i1022, '')
  }
  i1020.worldImages = i1022
  request.r(i1021[60], i1021[61], 0, i1020, 'imgProdImage')
  request.r(i1021[62], i1021[63], 0, i1020, 'txtWorldName')
  return i1020
}

Deserializers["SoundManager"] = function (request, data, root) {
  var i1024 = root || request.c( 'SoundManager' )
  var i1025 = data
  request.r(i1025[0], i1025[1], 0, i1024, 'sfxAuidoSource')
  i1024.soundOn = !!i1025[2]
  var i1027 = i1025[3]
  var i1026 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.AudioClip')))
  for(var i = 0; i < i1027.length; i += 2) {
  request.r(i1027[i + 0], i1027[i + 1], 1, i1026, '')
  }
  i1024.shootSFX = i1026
  var i1029 = i1025[4]
  var i1028 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.AudioClip')))
  for(var i = 0; i < i1029.length; i += 2) {
  request.r(i1029[i + 0], i1029[i + 1], 1, i1028, '')
  }
  i1024.botKillSFX = i1028
  request.r(i1025[5], i1025[6], 0, i1024, 'sniperShotSFX')
  request.r(i1025[7], i1025[8], 0, i1024, 'enemyShootSFX')
  request.r(i1025[9], i1025[10], 0, i1024, 'enemyCloneSFX')
  request.r(i1025[11], i1025[12], 0, i1024, 'coinPickSFX')
  request.r(i1025[13], i1025[14], 0, i1024, 'healthPickSFX')
  request.r(i1025[15], i1025[16], 0, i1024, 'tripleFirePickSFX')
  request.r(i1025[17], i1025[18], 0, i1024, 'portalSFX')
  request.r(i1025[19], i1025[20], 0, i1024, 'footstepSFX')
  request.r(i1025[21], i1025[22], 0, i1024, 'buildProcessSFX')
  request.r(i1025[23], i1025[24], 0, i1024, 'buildCompleteSFX')
  var i1031 = i1025[25]
  var i1030 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.AudioClip')))
  for(var i = 0; i < i1031.length; i += 2) {
  request.r(i1031[i + 0], i1031[i + 1], 1, i1030, '')
  }
  i1024.treeCutSFX = i1030
  request.r(i1025[26], i1025[27], 0, i1024, 'hitStoneSFX')
  request.r(i1025[28], i1025[29], 0, i1024, 'loseSFX')
  request.r(i1025[30], i1025[31], 0, i1024, 'backgroundAudioSource')
  return i1024
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i1034 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i1035 = data
  request.r(i1035[0], i1035[1], 0, i1034, 'clip')
  i1034.playOnAwake = !!i1035[2]
  i1034.loop = !!i1035[3]
  i1034.time = i1035[4]
  i1034.enabled = !!i1035[5]
  return i1034
}

Deserializers["BotSpawner"] = function (request, data, root) {
  var i1036 = root || request.c( 'BotSpawner' )
  var i1037 = data
  var i1039 = i1037[0]
  var i1038 = []
  for(var i = 0; i < i1039.length; i += 2) {
  request.r(i1039[i + 0], i1039[i + 1], 2, i1038, '')
  }
  i1036.enemySpawnPoint = i1038
  var i1041 = i1037[1]
  var i1040 = []
  for(var i = 0; i < i1041.length; i += 2) {
  request.r(i1041[i + 0], i1041[i + 1], 2, i1040, '')
  }
  i1036.enemy = i1040
  i1036.sec = i1037[2]
  i1036.downvalue = i1037[3]
  i1036.upduration = i1037[4]
  i1036.adjustvalue = i1037[5]
  i1036.spawnTime = i1037[6]
  i1036.spawnTimeMax = i1037[7]
  i1036.enemyCount = i1037[8]
  i1036.enemyCountMax = i1037[9]
  request.r(i1037[10], i1037[11], 0, i1036, 'enemy_cloner')
  request.r(i1037[12], i1037[13], 0, i1036, 'clonerMat')
  return i1036
}

Deserializers["TreeController"] = function (request, data, root) {
  var i1042 = root || request.c( 'TreeController' )
  var i1043 = data
  i1042.treeHealth = i1043[0]
  request.r(i1043[1], i1043[2], 0, i1042, 'leafFX')
  request.r(i1043[3], i1043[4], 0, i1042, 'treeTop')
  return i1042
}

Deserializers["AnimateTexture"] = function (request, data, root) {
  var i1044 = root || request.c( 'AnimateTexture' )
  var i1045 = data
  i1044.scrollSpeedX = i1045[0]
  i1044.scrollSpeedY = i1045[1]
  return i1044
}

Deserializers["PlayerController"] = function (request, data, root) {
  var i1046 = root || request.c( 'PlayerController' )
  var i1047 = data
  request.r(i1047[0], i1047[1], 0, i1046, 'anim')
  request.r(i1047[2], i1047[3], 0, i1046, 'rb')
  i1046.clickable = UnityEngine.LayerMask.FromIntegerValue( i1047[4] )
  i1046.running = !!i1047[5]
  i1046.dead = !!i1047[6]
  i1046.tapDelay = i1047[7]
  i1046.footstepDelay = i1047[8]
  i1046.healthKey = i1047[9]
  i1046.health = i1047[10]
  i1046.maxHealth = i1047[11]
  request.r(i1047[12], i1047[13], 0, i1046, 'bullet')
  request.r(i1047[14], i1047[15], 0, i1046, 'bulletForTrippleShoot')
  i1046.shootDelay = i1047[16]
  i1046.shootDelayMax = i1047[17]
  var i1049 = i1047[18]
  var i1048 = []
  for(var i = 0; i < i1049.length; i += 2) {
  request.r(i1049[i + 0], i1049[i + 1], 2, i1048, '')
  }
  i1046.firePoints = i1048
  request.r(i1047[19], i1047[20], 0, i1046, 'shellPoint')
  request.r(i1047[21], i1047[22], 0, i1046, 'bulletShellPrefab')
  i1046.canShoot = !!i1047[23]
  var i1051 = i1047[24]
  var i1050 = []
  for(var i = 0; i < i1051.length; i += 2) {
  request.r(i1051[i + 0], i1051[i + 1], 2, i1050, '')
  }
  i1046.enemies = i1050
  request.r(i1047[25], i1047[26], 0, i1046, 'closestEnemy')
  i1046.enemyContact = !!i1047[27]
  request.r(i1047[28], i1047[29], 0, i1046, 'muzzleFlash')
  i1046.range = i1047[30]
  request.r(i1047[31], i1047[32], 0, i1046, 'shieldPrefab')
  request.r(i1047[33], i1047[34], 0, i1046, 'shieldPickup')
  i1046.hasShield = !!i1047[35]
  request.r(i1047[36], i1047[37], 0, i1046, 'playerShield')
  i1046.shieldLevel = i1047[38]
  i1046.hasTripleShoot = !!i1047[39]
  i1046.tripleShootTimer = i1047[40]
  i1046.tripleShootTimerMax = i1047[41]
  request.r(i1047[42], i1047[43], 0, i1046, 'axeCollider')
  request.r(i1047[44], i1047[45], 0, i1046, 'slashFX')
  request.r(i1047[46], i1047[47], 0, i1046, 'axeAnim')
  i1046.woodPickRange = i1047[48]
  request.r(i1047[49], i1047[50], 0, i1046, 'woodStackParent')
  var i1053 = i1047[51]
  var i1052 = []
  for(var i = 0; i < i1053.length; i += 2) {
  request.r(i1053[i + 0], i1053[i + 1], 2, i1052, '')
  }
  i1046.woodStack = i1052
  return i1046
}

Deserializers["LumberCraft.PlayerInputController"] = function (request, data, root) {
  var i1054 = root || request.c( 'LumberCraft.PlayerInputController' )
  var i1055 = data
  i1054.speed = i1055[0]
  i1054.movemenetSmoothing = i1055[1]
  i1054.rotationSmoothing = i1055[2]
  i1054.maxDragDistance = i1055[3]
  request.r(i1055[4], i1055[5], 0, i1054, 'downloadNow')
  return i1054
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i1056 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i1057 = data
  i1056.enabled = !!i1057[0]
  request.r(i1057[1], i1057[2], 0, i1056, 'sharedMaterial')
  var i1059 = i1057[3]
  var i1058 = []
  for(var i = 0; i < i1059.length; i += 2) {
  request.r(i1059[i + 0], i1059[i + 1], 2, i1058, '')
  }
  i1056.sharedMaterials = i1058
  i1056.receiveShadows = !!i1057[4]
  i1056.shadowCastingMode = i1057[5]
  i1056.sortingLayerID = i1057[6]
  i1056.sortingOrder = i1057[7]
  i1056.lightmapIndex = i1057[8]
  i1056.lightmapSceneIndex = i1057[9]
  i1056.lightmapScaleOffset = new pc.Vec4( i1057[10], i1057[11], i1057[12], i1057[13] )
  i1056.lightProbeUsage = i1057[14]
  i1056.reflectionProbeUsage = i1057[15]
  i1056.color = new pc.Color(i1057[16], i1057[17], i1057[18], i1057[19])
  request.r(i1057[20], i1057[21], 0, i1056, 'sprite')
  i1056.flipX = !!i1057[22]
  i1056.flipY = !!i1057[23]
  i1056.drawMode = i1057[24]
  i1056.size = new pc.Vec2( i1057[25], i1057[26] )
  i1056.tileMode = i1057[27]
  i1056.adaptiveModeThreshold = i1057[28]
  i1056.maskInteraction = i1057[29]
  i1056.spriteSortPoint = i1057[30]
  return i1056
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i1060 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i1061 = data
  i1060.enabled = !!i1061[0]
  i1060.planeDistance = i1061[1]
  i1060.referencePixelsPerUnit = i1061[2]
  i1060.isFallbackOverlay = !!i1061[3]
  i1060.renderMode = i1061[4]
  i1060.renderOrder = i1061[5]
  i1060.sortingLayerName = i1061[6]
  i1060.sortingOrder = i1061[7]
  i1060.scaleFactor = i1061[8]
  request.r(i1061[9], i1061[10], 0, i1060, 'worldCamera')
  i1060.overrideSorting = !!i1061[11]
  i1060.pixelPerfect = !!i1061[12]
  i1060.targetDisplay = i1061[13]
  i1060.overridePixelPerfect = !!i1061[14]
  return i1060
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i1062 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i1063 = data
  i1062.m_UiScaleMode = i1063[0]
  i1062.m_ReferencePixelsPerUnit = i1063[1]
  i1062.m_ScaleFactor = i1063[2]
  i1062.m_ReferenceResolution = new pc.Vec2( i1063[3], i1063[4] )
  i1062.m_ScreenMatchMode = i1063[5]
  i1062.m_MatchWidthOrHeight = i1063[6]
  i1062.m_PhysicalUnit = i1063[7]
  i1062.m_FallbackScreenDPI = i1063[8]
  i1062.m_DefaultSpriteDPI = i1063[9]
  i1062.m_DynamicPixelsPerUnit = i1063[10]
  return i1062
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i1064 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i1065 = data
  i1064.m_IgnoreReversedGraphics = !!i1065[0]
  i1064.m_BlockingObjects = i1065[1]
  i1064.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i1065[2] )
  return i1064
}

Deserializers["UnityEngine.UI.Outline"] = function (request, data, root) {
  var i1066 = root || request.c( 'UnityEngine.UI.Outline' )
  var i1067 = data
  i1066.m_EffectColor = new pc.Color(i1067[0], i1067[1], i1067[2], i1067[3])
  i1066.m_EffectDistance = new pc.Vec2( i1067[4], i1067[5] )
  i1066.m_UseGraphicAlpha = !!i1067[6]
  return i1066
}

Deserializers["LocalizationReplacer"] = function (request, data, root) {
  var i1068 = root || request.c( 'LocalizationReplacer' )
  var i1069 = data
  request.r(i1069[0], i1069[1], 0, i1068, 'MyImage')
  request.r(i1069[2], i1069[3], 0, i1068, 'Mytxt')
  var i1071 = i1069[4]
  var i1070 = []
  for(var i = 0; i < i1071.length; i += 1) {
    i1070.push( request.d('LocalizationImageSet', i1071[i + 0]) );
  }
  i1068.localizationDatas = i1070
  return i1068
}

Deserializers["LocalizationImageSet"] = function (request, data, root) {
  var i1074 = root || request.c( 'LocalizationImageSet' )
  var i1075 = data
  i1074.Name = i1075[0]
  request.r(i1075[1], i1075[2], 0, i1074, 'Image')
  i1074.Str = i1075[3]
  return i1074
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i1076 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i1077 = data
  request.r(i1077[0], i1077[1], 0, i1076, 'm_FirstSelected')
  i1076.m_sendNavigationEvents = !!i1077[2]
  i1076.m_DragThreshold = i1077[3]
  return i1076
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i1078 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i1079 = data
  i1078.m_HorizontalAxis = i1079[0]
  i1078.m_VerticalAxis = i1079[1]
  i1078.m_SubmitButton = i1079[2]
  i1078.m_CancelButton = i1079[3]
  i1078.m_InputActionsPerSecond = i1079[4]
  i1078.m_RepeatDelay = i1079[5]
  i1078.m_ForceModuleActive = !!i1079[6]
  return i1078
}

Deserializers["BuildingController"] = function (request, data, root) {
  var i1080 = root || request.c( 'BuildingController' )
  var i1081 = data
  i1080.requiredWood = i1081[0]
  i1080.isComplete = !!i1081[1]
  var i1083 = i1081[2]
  var i1082 = []
  for(var i = 0; i < i1083.length; i += 2) {
  request.r(i1083[i + 0], i1083[i + 1], 2, i1082, '')
  }
  i1080.buildStages = i1082
  request.r(i1081[3], i1081[4], 0, i1080, 'txtReqWood')
  request.r(i1081[5], i1081[6], 0, i1080, 'buildCanvas')
  return i1080
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i1084 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i1085 = data
  i1084.name = i1085[0]
  i1084.atlasId = i1085[1]
  i1084.mipmapCount = i1085[2]
  i1084.hdr = !!i1085[3]
  i1084.size = i1085[4]
  i1084.anisoLevel = i1085[5]
  i1084.filterMode = i1085[6]
  i1084.wrapMode = i1085[7]
  var i1087 = i1085[8]
  var i1086 = []
  for(var i = 0; i < i1087.length; i += 4) {
    i1086.push( UnityEngine.Rect.MinMaxRect(i1087[i + 0], i1087[i + 1], i1087[i + 2], i1087[i + 3]) );
  }
  i1084.rects = i1086
  return i1084
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1090 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1091 = data
  i1090.name = i1091[0]
  i1090.index = i1091[1]
  i1090.startup = !!i1091[2]
  return i1090
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1092 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1093 = data
  i1092.ambientIntensity = i1093[0]
  i1092.reflectionIntensity = i1093[1]
  i1092.ambientMode = i1093[2]
  i1092.ambientLight = new pc.Color(i1093[3], i1093[4], i1093[5], i1093[6])
  i1092.ambientSkyColor = new pc.Color(i1093[7], i1093[8], i1093[9], i1093[10])
  i1092.ambientGroundColor = new pc.Color(i1093[11], i1093[12], i1093[13], i1093[14])
  i1092.ambientEquatorColor = new pc.Color(i1093[15], i1093[16], i1093[17], i1093[18])
  i1092.fogColor = new pc.Color(i1093[19], i1093[20], i1093[21], i1093[22])
  i1092.fogEndDistance = i1093[23]
  i1092.fogStartDistance = i1093[24]
  i1092.fogDensity = i1093[25]
  i1092.fog = !!i1093[26]
  request.r(i1093[27], i1093[28], 0, i1092, 'skybox')
  i1092.fogMode = i1093[29]
  var i1095 = i1093[30]
  var i1094 = []
  for(var i = 0; i < i1095.length; i += 1) {
    i1094.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1095[i + 0]) );
  }
  i1092.lightmaps = i1094
  i1092.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1093[31], i1092.lightProbes)
  i1092.lightmapsMode = i1093[32]
  i1092.environmentLightingMode = i1093[33]
  i1092.ambientProbe = new pc.SphericalHarmonicsL2(i1093[34])
  request.r(i1093[35], i1093[36], 0, i1092, 'customReflection')
  request.r(i1093[37], i1093[38], 0, i1092, 'defaultReflection')
  i1092.defaultReflectionMode = i1093[39]
  i1092.defaultReflectionResolution = i1093[40]
  i1092.sunLightObjectId = i1093[41]
  i1092.pixelLightCount = i1093[42]
  i1092.defaultReflectionHDR = !!i1093[43]
  i1092.hasLightDataAsset = !!i1093[44]
  i1092.hasManualGenerate = !!i1093[45]
  return i1092
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1098 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1099 = data
  request.r(i1099[0], i1099[1], 0, i1098, 'lightmapColor')
  request.r(i1099[2], i1099[3], 0, i1098, 'lightmapDirection')
  return i1098
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1100 = root || new UnityEngine.LightProbes()
  var i1101 = data
  return i1100
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1106 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1107 = data
  i1106.name = i1107[0]
  var i1109 = i1107[1]
  var i1108 = []
  for(var i = 0; i < i1109.length; i += 1) {
    i1108.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1109[i + 0]) );
  }
  i1106.passes = i1108
  var i1111 = i1107[2]
  var i1110 = []
  for(var i = 0; i < i1111.length; i += 1) {
    i1110.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1111[i + 0]) );
  }
  i1106.defaultParameterValues = i1110
  request.r(i1107[3], i1107[4], 0, i1106, 'unityFallbackShader')
  i1106.readDepth = !!i1107[5]
  return i1106
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1114 = root || new pc.UnityShaderPass()
  var i1115 = data
  i1114.passType = i1115[0]
  i1114.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1115[1], i1114.zTest)
  i1114.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1115[2], i1114.zWrite)
  i1114.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1115[3], i1114.culling)
  i1114.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1115[4], i1114.blending)
  i1114.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1115[5], i1114.alphaBlending)
  i1114.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1115[6], i1114.colorWriteMask)
  i1114.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1115[7], i1114.offsetUnits)
  i1114.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1115[8], i1114.offsetFactor)
  i1114.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1115[9], i1114.stencilRef)
  i1114.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1115[10], i1114.stencilReadMask)
  i1114.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1115[11], i1114.stencilWriteMask)
  i1114.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1115[12], i1114.stencilOp)
  i1114.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1115[13], i1114.stencilOpFront)
  i1114.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1115[14], i1114.stencilOpBack)
  var i1117 = i1115[15]
  var i1116 = []
  for(var i = 0; i < i1117.length; i += 1) {
    i1116.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1117[i + 0]) );
  }
  i1114.tags = i1116
  var i1119 = i1115[16]
  var i1118 = []
  for(var i = 0; i < i1119.length; i += 1) {
    i1118.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1119[i + 0]) );
  }
  i1114.variants = i1118
  i1114.readDepth = !!i1115[17]
  return i1114
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1120 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1121 = data
  i1120.val = i1121[0]
  i1120.name = i1121[1]
  return i1120
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1122 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1123 = data
  i1122.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1123[0], i1122.src)
  i1122.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1123[1], i1122.dst)
  i1122.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1123[2], i1122.op)
  return i1122
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1124 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1125 = data
  i1124.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1125[0], i1124.pass)
  i1124.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1125[1], i1124.fail)
  i1124.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1125[2], i1124.zFail)
  i1124.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1125[3], i1124.comp)
  return i1124
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1128 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1129 = data
  i1128.name = i1129[0]
  i1128.value = i1129[1]
  return i1128
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1132 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1133 = data
  var i1135 = i1133[0]
  var i1134 = []
  for(var i = 0; i < i1135.length; i += 1) {
    i1134.push( i1135[i + 0] );
  }
  i1132.keywords = i1134
  i1132.vertexProgram = i1133[1]
  i1132.fragmentProgram = i1133[2]
  i1132.readDepth = !!i1133[3]
  return i1132
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1140 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1141 = data
  i1140.name = i1141[0]
  i1140.type = i1141[1]
  i1140.value = new pc.Vec4( i1141[2], i1141[3], i1141[4], i1141[5] )
  i1140.textureValue = i1141[6]
  return i1140
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1142 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1143 = data
  i1142.name = i1143[0]
  request.r(i1143[1], i1143[2], 0, i1142, 'texture')
  i1142.aabb = i1143[3]
  i1142.vertices = i1143[4]
  i1142.triangles = i1143[5]
  i1142.textureRect = UnityEngine.Rect.MinMaxRect(i1143[6], i1143[7], i1143[8], i1143[9])
  i1142.packedRect = UnityEngine.Rect.MinMaxRect(i1143[10], i1143[11], i1143[12], i1143[13])
  i1142.border = new pc.Vec4( i1143[14], i1143[15], i1143[16], i1143[17] )
  i1142.transparency = i1143[18]
  i1142.bounds = i1143[19]
  i1142.pixelsPerUnit = i1143[20]
  i1142.textureWidth = i1143[21]
  i1142.textureHeight = i1143[22]
  i1142.nativeSize = new pc.Vec2( i1143[23], i1143[24] )
  i1142.pivot = new pc.Vec2( i1143[25], i1143[26] )
  i1142.textureRectOffset = new pc.Vec2( i1143[27], i1143[28] )
  return i1142
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1144 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1145 = data
  i1144.name = i1145[0]
  return i1144
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i1146 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i1147 = data
  i1146.name = i1147[0]
  i1146.wrapMode = i1147[1]
  i1146.isLooping = !!i1147[2]
  i1146.length = i1147[3]
  var i1149 = i1147[4]
  var i1148 = []
  for(var i = 0; i < i1149.length; i += 1) {
    i1148.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i1149[i + 0]) );
  }
  i1146.curves = i1148
  var i1151 = i1147[5]
  var i1150 = []
  for(var i = 0; i < i1151.length; i += 1) {
    i1150.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i1151[i + 0]) );
  }
  i1146.events = i1150
  i1146.halfPrecision = !!i1147[6]
  return i1146
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i1154 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i1155 = data
  i1154.path = i1155[0]
  i1154.componentType = i1155[1]
  i1154.property = i1155[2]
  i1154.keys = i1155[3]
  var i1157 = i1155[4]
  var i1156 = []
  for(var i = 0; i < i1157.length; i += 1) {
    i1156.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i1157[i + 0]) );
  }
  i1154.objectReferenceKeys = i1156
  return i1154
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i1160 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i1161 = data
  i1160.time = i1161[0]
  request.r(i1161[1], i1161[2], 0, i1160, 'value')
  return i1160
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i1164 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i1165 = data
  i1164.functionName = i1165[0]
  i1164.floatParameter = i1165[1]
  i1164.intParameter = i1165[2]
  i1164.stringParameter = i1165[3]
  request.r(i1165[4], i1165[5], 0, i1164, 'objectReferenceParameter')
  i1164.time = i1165[6]
  return i1164
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1166 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1167 = data
  i1166.name = i1167[0]
  i1166.ascent = i1167[1]
  i1166.originalLineHeight = i1167[2]
  i1166.fontSize = i1167[3]
  var i1169 = i1167[4]
  var i1168 = []
  for(var i = 0; i < i1169.length; i += 1) {
    i1168.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1169[i + 0]) );
  }
  i1166.characterInfo = i1168
  request.r(i1167[5], i1167[6], 0, i1166, 'texture')
  i1166.originalFontSize = i1167[7]
  return i1166
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1172 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1173 = data
  i1172.index = i1173[0]
  i1172.advance = i1173[1]
  i1172.bearing = i1173[2]
  i1172.glyphWidth = i1173[3]
  i1172.glyphHeight = i1173[4]
  i1172.minX = i1173[5]
  i1172.maxX = i1173[6]
  i1172.minY = i1173[7]
  i1172.maxY = i1173[8]
  i1172.uvBottomLeftX = i1173[9]
  i1172.uvBottomLeftY = i1173[10]
  i1172.uvBottomRightX = i1173[11]
  i1172.uvBottomRightY = i1173[12]
  i1172.uvTopLeftX = i1173[13]
  i1172.uvTopLeftY = i1173[14]
  i1172.uvTopRightX = i1173[15]
  i1172.uvTopRightY = i1173[16]
  return i1172
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController"] = function (request, data, root) {
  var i1174 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController' )
  var i1175 = data
  i1174.name = i1175[0]
  var i1177 = i1175[1]
  var i1176 = []
  for(var i = 0; i < i1177.length; i += 1) {
    i1176.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState', i1177[i + 0]) );
  }
  i1174.states = i1176
  var i1179 = i1175[2]
  var i1178 = []
  for(var i = 0; i < i1179.length; i += 1) {
    i1178.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer', i1179[i + 0]) );
  }
  i1174.layers = i1178
  var i1181 = i1175[3]
  var i1180 = []
  for(var i = 0; i < i1181.length; i += 1) {
    i1180.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter', i1181[i + 0]) );
  }
  i1174.parameters = i1180
  return i1174
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState"] = function (request, data, root) {
  var i1184 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState' )
  var i1185 = data
  i1184.cycleOffset = i1185[0]
  i1184.cycleOffsetParameter = i1185[1]
  i1184.cycleOffsetParameterActive = !!i1185[2]
  i1184.mirror = !!i1185[3]
  i1184.mirrorParameter = i1185[4]
  i1184.mirrorParameterActive = !!i1185[5]
  i1184.motionId = i1185[6]
  i1184.nameHash = i1185[7]
  i1184.fullPathHash = i1185[8]
  i1184.speed = i1185[9]
  i1184.speedParameter = i1185[10]
  i1184.speedParameterActive = !!i1185[11]
  i1184.tag = i1185[12]
  i1184.name = i1185[13]
  i1184.writeDefaultValues = !!i1185[14]
  var i1187 = i1185[15]
  var i1186 = []
  for(var i = 0; i < i1187.length; i += 1) {
    i1186.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1187[i + 0]) );
  }
  i1184.transitions = i1186
  var i1189 = i1185[16]
  var i1188 = []
  for(var i = 0; i < i1189.length; i += 2) {
  request.r(i1189[i + 0], i1189[i + 1], 2, i1188, '')
  }
  i1184.behaviours = i1188
  return i1184
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition"] = function (request, data, root) {
  var i1192 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition' )
  var i1193 = data
  i1192.fullPath = i1193[0]
  i1192.canTransitionToSelf = !!i1193[1]
  i1192.duration = i1193[2]
  i1192.exitTime = i1193[3]
  i1192.hasExitTime = !!i1193[4]
  i1192.hasFixedDuration = !!i1193[5]
  i1192.interruptionSource = i1193[6]
  i1192.offset = i1193[7]
  i1192.orderedInterruption = !!i1193[8]
  i1192.destinationStateNameHash = i1193[9]
  i1192.destinationStateMachineId = i1193[10]
  i1192.isExit = !!i1193[11]
  i1192.mute = !!i1193[12]
  i1192.solo = !!i1193[13]
  var i1195 = i1193[14]
  var i1194 = []
  for(var i = 0; i < i1195.length; i += 1) {
    i1194.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1195[i + 0]) );
  }
  i1192.conditions = i1194
  return i1192
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer"] = function (request, data, root) {
  var i1200 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer' )
  var i1201 = data
  i1200.blendingMode = i1201[0]
  i1200.defaultWeight = i1201[1]
  i1200.name = i1201[2]
  i1200.stateMachine = request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine', i1201[3], i1200.stateMachine)
  return i1200
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine"] = function (request, data, root) {
  var i1202 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine' )
  var i1203 = data
  i1202.id = i1203[0]
  i1202.defaultStateNameHash = i1203[1]
  var i1205 = i1203[2]
  var i1204 = []
  for(var i = 0; i < i1205.length; i += 1) {
    i1204.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition', i1205[i + 0]) );
  }
  i1202.entryTransitions = i1204
  var i1207 = i1203[3]
  var i1206 = []
  for(var i = 0; i < i1207.length; i += 1) {
    i1206.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition', i1207[i + 0]) );
  }
  i1202.anyStateTransitions = i1206
  return i1202
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition"] = function (request, data, root) {
  var i1210 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition' )
  var i1211 = data
  i1210.destinationStateNameHash = i1211[0]
  i1210.destinationStateMachineId = i1211[1]
  i1210.isExit = !!i1211[2]
  i1210.mute = !!i1211[3]
  i1210.solo = !!i1211[4]
  var i1213 = i1211[5]
  var i1212 = []
  for(var i = 0; i < i1213.length; i += 1) {
    i1212.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition', i1213[i + 0]) );
  }
  i1210.conditions = i1212
  return i1210
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter"] = function (request, data, root) {
  var i1216 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter' )
  var i1217 = data
  i1216.defaultBool = !!i1217[0]
  i1216.defaultFloat = i1217[1]
  i1216.defaultInt = i1217[2]
  i1216.name = i1217[3]
  i1216.nameHash = i1217[4]
  i1216.type = i1217[5]
  return i1216
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition"] = function (request, data, root) {
  var i1220 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition' )
  var i1221 = data
  i1220.mode = i1221[0]
  i1220.parameter = i1221[1]
  i1220.threshold = i1221[2]
  return i1220
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1222 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1223 = data
  var i1225 = i1223[0]
  var i1224 = []
  for(var i = 0; i < i1225.length; i += 1) {
    i1224.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1225[i + 0]) );
  }
  i1222.files = i1224
  i1222.componentToPrefabIds = i1223[1]
  return i1222
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1228 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1229 = data
  i1228.path = i1229[0]
  request.r(i1229[1], i1229[2], 0, i1228, 'unityObject')
  return i1228
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1230 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1231 = data
  var i1233 = i1231[0]
  var i1232 = []
  for(var i = 0; i < i1233.length; i += 1) {
    i1232.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1233[i + 0]) );
  }
  i1230.scriptsExecutionOrder = i1232
  var i1235 = i1231[1]
  var i1234 = []
  for(var i = 0; i < i1235.length; i += 1) {
    i1234.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1235[i + 0]) );
  }
  i1230.sortingLayers = i1234
  var i1237 = i1231[2]
  var i1236 = []
  for(var i = 0; i < i1237.length; i += 1) {
    i1236.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1237[i + 0]) );
  }
  i1230.cullingLayers = i1236
  i1230.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1231[3], i1230.timeSettings)
  i1230.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1231[4], i1230.physicsSettings)
  i1230.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1231[5], i1230.physics2DSettings)
  i1230.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1231[6], i1230.qualitySettings)
  i1230.removeShadows = !!i1231[7]
  i1230.autoInstantiatePrefabs = !!i1231[8]
  i1230.enableAutoInstancing = !!i1231[9]
  i1230.lightmapEncodingQuality = i1231[10]
  i1230.desiredColorSpace = i1231[11]
  return i1230
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1240 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1241 = data
  i1240.name = i1241[0]
  i1240.value = i1241[1]
  return i1240
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1244 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1245 = data
  i1244.id = i1245[0]
  i1244.name = i1245[1]
  i1244.value = i1245[2]
  return i1244
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1248 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1249 = data
  i1248.id = i1249[0]
  i1248.name = i1249[1]
  return i1248
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1250 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1251 = data
  i1250.fixedDeltaTime = i1251[0]
  i1250.maximumDeltaTime = i1251[1]
  i1250.timeScale = i1251[2]
  i1250.maximumParticleTimestep = i1251[3]
  return i1250
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1252 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1253 = data
  i1252.gravity = new pc.Vec3( i1253[0], i1253[1], i1253[2] )
  i1252.defaultSolverIterations = i1253[3]
  i1252.bounceThreshold = i1253[4]
  i1252.autoSyncTransforms = !!i1253[5]
  i1252.autoSimulation = !!i1253[6]
  var i1255 = i1253[7]
  var i1254 = []
  for(var i = 0; i < i1255.length; i += 1) {
    i1254.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1255[i + 0]) );
  }
  i1252.collisionMatrix = i1254
  return i1252
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1258 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1259 = data
  i1258.enabled = !!i1259[0]
  i1258.layerId = i1259[1]
  i1258.otherLayerId = i1259[2]
  return i1258
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1260 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1261 = data
  request.r(i1261[0], i1261[1], 0, i1260, 'material')
  i1260.gravity = new pc.Vec2( i1261[2], i1261[3] )
  i1260.positionIterations = i1261[4]
  i1260.velocityIterations = i1261[5]
  i1260.velocityThreshold = i1261[6]
  i1260.maxLinearCorrection = i1261[7]
  i1260.maxAngularCorrection = i1261[8]
  i1260.maxTranslationSpeed = i1261[9]
  i1260.maxRotationSpeed = i1261[10]
  i1260.timeToSleep = i1261[11]
  i1260.linearSleepTolerance = i1261[12]
  i1260.angularSleepTolerance = i1261[13]
  i1260.defaultContactOffset = i1261[14]
  i1260.autoSimulation = !!i1261[15]
  i1260.queriesHitTriggers = !!i1261[16]
  i1260.queriesStartInColliders = !!i1261[17]
  i1260.callbacksOnDisable = !!i1261[18]
  i1260.reuseCollisionCallbacks = !!i1261[19]
  i1260.autoSyncTransforms = !!i1261[20]
  var i1263 = i1261[21]
  var i1262 = []
  for(var i = 0; i < i1263.length; i += 1) {
    i1262.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1263[i + 0]) );
  }
  i1260.collisionMatrix = i1262
  return i1260
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1266 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1267 = data
  i1266.enabled = !!i1267[0]
  i1266.layerId = i1267[1]
  i1266.otherLayerId = i1267[2]
  return i1266
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1268 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1269 = data
  var i1271 = i1269[0]
  var i1270 = []
  for(var i = 0; i < i1271.length; i += 1) {
    i1270.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1271[i + 0]) );
  }
  i1268.qualityLevels = i1270
  var i1273 = i1269[1]
  var i1272 = []
  for(var i = 0; i < i1273.length; i += 1) {
    i1272.push( i1273[i + 0] );
  }
  i1268.names = i1272
  i1268.shadows = i1269[2]
  i1268.anisotropicFiltering = i1269[3]
  i1268.antiAliasing = i1269[4]
  i1268.lodBias = i1269[5]
  i1268.shadowCascades = i1269[6]
  i1268.shadowDistance = i1269[7]
  i1268.shadowmaskMode = i1269[8]
  i1268.shadowProjection = i1269[9]
  i1268.shadowResolution = i1269[10]
  i1268.softParticles = !!i1269[11]
  i1268.softVegetation = !!i1269[12]
  i1268.activeColorSpace = i1269[13]
  i1268.desiredColorSpace = i1269[14]
  i1268.masterTextureLimit = i1269[15]
  i1268.maxQueuedFrames = i1269[16]
  i1268.particleRaycastBudget = i1269[17]
  i1268.pixelLightCount = i1269[18]
  i1268.realtimeReflectionProbes = !!i1269[19]
  i1268.shadowCascade2Split = i1269[20]
  i1268.shadowCascade4Split = new pc.Vec3( i1269[21], i1269[22], i1269[23] )
  i1268.streamingMipmapsActive = !!i1269[24]
  i1268.vSyncCount = i1269[25]
  i1268.asyncUploadBufferSize = i1269[26]
  i1268.asyncUploadTimeSlice = i1269[27]
  i1268.billboardsFaceCameraPosition = !!i1269[28]
  i1268.shadowNearPlaneOffset = i1269[29]
  i1268.streamingMipmapsMemoryBudget = i1269[30]
  i1268.maximumLODLevel = i1269[31]
  i1268.streamingMipmapsAddAllCameras = !!i1269[32]
  i1268.streamingMipmapsMaxLevelReduction = i1269[33]
  i1268.streamingMipmapsRenderersPerFrame = i1269[34]
  i1268.resolutionScalingFixedDPIFactor = i1269[35]
  i1268.streamingMipmapsMaxFileIORequests = i1269[36]
  return i1268
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1278 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1279 = data
  i1278.weight = i1279[0]
  i1278.vertices = i1279[1]
  i1278.normals = i1279[2]
  i1278.tangents = i1279[3]
  return i1278
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1280 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1281 = data
  i1280.xPlacement = i1281[0]
  i1280.yPlacement = i1281[1]
  i1280.xAdvance = i1281[2]
  i1280.yAdvance = i1281[3]
  return i1280
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1282 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1283 = data
  request.r(i1283[0], i1283[1], 0, i1282, 'm_ObjectArgument')
  i1282.m_ObjectArgumentAssemblyTypeName = i1283[2]
  i1282.m_IntArgument = i1283[3]
  i1282.m_FloatArgument = i1283[4]
  i1282.m_StringArgument = i1283[5]
  i1282.m_BoolArgument = !!i1283[6]
  return i1282
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tag":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"speedModifier":4,"space":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limitX":1,"limitY":2,"limitZ":3,"dampen":4,"separateAxes":5,"space":6,"drag":7,"multiplyDragByParticleSize":8,"multiplyDragByParticleVelocity":9},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"enabled":0,"sharedMaterial":1,"sharedMaterials":3,"receiveShadows":4,"shadowCastingMode":5,"sortingLayerID":6,"sortingOrder":7,"lightmapIndex":8,"lightmapSceneIndex":9,"lightmapScaleOffset":10,"lightProbeUsage":14,"reflectionProbeUsage":15,"mesh":16,"meshCount":18,"activeVertexStreamsCount":19,"alignment":20,"renderMode":21,"sortMode":22,"lengthScale":23,"velocityScale":24,"cameraVelocityScale":25,"normalDirection":26,"sortingFudge":27,"minParticleSize":28,"maxParticleSize":29,"pivot":30,"trailMaterial":33},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"vertexCount":2,"aabb":3,"streams":4,"vertices":5,"subMeshes":6,"bindposes":7,"blendShapes":8},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"updateMode":2,"humanBones":3,"enabled":4},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"enabled":0,"sharedMaterial":1,"sharedMaterials":3,"receiveShadows":4,"shadowCastingMode":5,"sortingLayerID":6,"sortingOrder":7,"lightmapIndex":8,"lightmapSceneIndex":9,"lightmapScaleOffset":10,"lightProbeUsage":14,"reflectionProbeUsage":15,"sharedMesh":16,"bones":18,"updateWhenOffscreen":19,"localBounds":20,"rootBone":21,"blendShapesWeights":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Components.Light":{"enabled":0,"type":1,"color":2,"cullingMask":6,"intensity":7,"range":8,"spotAngle":9,"shadows":10,"shadowNormalBias":11,"shadowBias":12,"shadowStrength":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.TrailRenderer":{"enabled":0,"sharedMaterial":1,"sharedMaterials":3,"receiveShadows":4,"shadowCastingMode":5,"sortingLayerID":6,"sortingOrder":7,"lightmapIndex":8,"lightmapSceneIndex":9,"lightmapScaleOffset":10,"lightProbeUsage":14,"reflectionProbeUsage":15,"positions":16,"positionCount":17,"time":18,"startWidth":19,"endWidth":20,"widthMultiplier":21,"autodestruct":22,"emitting":23,"numCornerVertices":24,"numCapVertices":25,"minVertexDistance":26,"colorGradient":27,"startColor":28,"endColor":32,"generateLightingData":36,"textureMode":37,"alignment":38,"widthCurve":39},"Luna.Unity.DTO.UnityEngine.Components.Rigidbody":{"mass":0,"drag":1,"angularDrag":2,"useGravity":3,"isKinematic":4,"constraints":5,"maxAngularVelocity":6,"collisionDetectionMode":7,"interpolation":8},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"enabled":0,"aspect":1,"orthographic":2,"orthographicSize":3,"backgroundColor":4,"nearClipPlane":8,"farClipPlane":9,"fieldOfView":10,"depth":11,"clearFlags":12,"cullingMask":13,"rect":14,"targetTexture":15},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"enabled":0,"isTrigger":1,"material":2,"sharedMesh":4,"convex":6},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"enabled":0,"isTrigger":1,"material":2,"center":4,"radius":7},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"playOnAwake":2,"loop":3,"time":4,"enabled":5},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"enabled":0,"sharedMaterial":1,"sharedMaterials":3,"receiveShadows":4,"shadowCastingMode":5,"sortingLayerID":6,"sortingOrder":7,"lightmapIndex":8,"lightmapSceneIndex":9,"lightmapScaleOffset":10,"lightProbeUsage":14,"reflectionProbeUsage":15,"color":16,"sprite":20,"flipX":22,"flipY":23,"drawMode":24,"size":25,"tileMode":27,"adaptiveModeThreshold":28,"maskInteraction":29,"spriteSortPoint":30},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"enabled":0,"planeDistance":1,"referencePixelsPerUnit":2,"isFallbackOverlay":3,"renderMode":4,"renderOrder":5,"sortingLayerName":6,"sortingOrder":7,"scaleFactor":8,"worldCamera":9,"overrideSorting":11,"pixelPerfect":12,"targetDisplay":13,"overridePixelPerfect":14},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"wrapMode":7,"rects":8},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"environmentLightingMode":33,"ambientProbe":34,"customReflection":35,"defaultReflection":37,"defaultReflectionMode":39,"defaultReflectionResolution":40,"sunLightObjectId":41,"pixelLightCount":42,"defaultReflectionHDR":43,"hasLightDataAsset":44,"hasManualGenerate":45},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"name":0,"passes":1,"defaultParameterValues":2,"unityFallbackShader":3,"readDepth":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"passType":0,"zTest":1,"zWrite":2,"culling":3,"blending":4,"alphaBlending":5,"colorWriteMask":6,"offsetUnits":7,"offsetFactor":8,"stencilRef":9,"stencilReadMask":10,"stencilWriteMask":11,"stencilOp":12,"stencilOpFront":13,"stencilOpBack":14,"tags":15,"variants":16,"readDepth":17},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"keywords":0,"vertexProgram":1,"fragmentProgram":2,"readDepth":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"componentType":1,"property":2,"keys":3,"objectReferenceKeys":4},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorController":{"name":0,"states":1,"layers":2,"parameters":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorState":{"cycleOffset":0,"cycleOffsetParameter":1,"cycleOffsetParameterActive":2,"mirror":3,"mirrorParameter":4,"mirrorParameterActive":5,"motionId":6,"nameHash":7,"fullPathHash":8,"speed":9,"speedParameter":10,"speedParameterActive":11,"tag":12,"name":13,"writeDefaultValues":14,"transitions":15,"behaviours":16},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateTransition":{"fullPath":0,"canTransitionToSelf":1,"duration":2,"exitTime":3,"hasExitTime":4,"hasFixedDuration":5,"interruptionSource":6,"offset":7,"orderedInterruption":8,"destinationStateNameHash":9,"destinationStateMachineId":10,"isExit":11,"mute":12,"solo":13,"conditions":14},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerLayer":{"blendingMode":0,"defaultWeight":1,"name":2,"stateMachine":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorStateMachine":{"id":0,"defaultStateNameHash":1,"entryTransitions":2,"anyStateTransitions":3},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorTransition":{"destinationStateNameHash":0,"destinationStateMachineId":1,"isExit":2,"mute":3,"solo":4,"conditions":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorControllerParameter":{"defaultBool":0,"defaultFloat":1,"defaultInt":2,"name":3,"nameHash":4,"type":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.AnimatorCondition":{"mode":0,"parameter":1,"threshold":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"removeShadows":7,"autoInstantiatePrefabs":8,"enableAutoInstancing":9,"lightmapEncodingQuality":10,"desiredColorSpace":11},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"timeToSleep":11,"linearSleepTolerance":12,"angularSleepTolerance":13,"defaultContactOffset":14,"autoSimulation":15,"queriesHitTriggers":16,"queriesStartInColliders":17,"callbacksOnDisable":18,"reuseCollisionCallbacks":19,"autoSyncTransforms":20,"collisionMatrix":21},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"71":[72],"73":[72],"74":[72],"75":[72],"76":[72],"77":[72],"78":[13],"79":[20],"80":[19],"81":[19],"82":[19],"83":[19],"84":[19],"85":[19],"86":[19],"87":[88],"89":[88],"90":[88],"91":[88],"92":[88],"93":[88],"94":[88],"95":[88],"96":[88],"97":[88],"98":[88],"99":[88],"100":[88],"101":[20],"102":[10],"103":[104],"105":[104],"62":[23],"53":[55],"106":[2],"7":[2],"107":[14],"108":[14],"109":[23],"110":[24,23],"64":[62],"32":[24,23],"111":[23],"63":[62],"41":[23],"112":[23],"113":[23],"114":[23],"115":[23],"116":[23],"40":[23],"35":[23],"117":[24,23],"118":[24,23],"119":[23],"39":[23],"120":[23],"121":[23],"42":[24,23],"122":[23],"123":[67],"124":[67],"68":[67],"125":[67],"126":[20],"127":[20],"128":[23],"129":[24,23],"130":[10],"131":[24,23],"132":[24,23],"26":[10,24,23],"36":[23,24],"133":[23]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Transform","UnityEngine.ParticleSystem","UnityEngine.Mesh","UnityEngine.ParticleSystemRenderer","UnityEngine.Material","UnityEngine.MonoBehaviour","CFX_AutoDestructShuriken","UnityEngine.Texture2D","UnityEngine.MeshFilter","UnityEngine.MeshRenderer","UnityEngine.Animator","UnityEditor.Animations.AnimatorController","UnityEngine.SkinnedMeshRenderer","UnityEngine.Light","UnityEngine.BoxCollider","PlayerBullet","UnityEngine.TrailRenderer","BulletController","UnityEngine.Rigidbody","UnityEngine.Camera","UnityEngine.AudioListener","CameraController","UnityEngine.RectTransform","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","TMPro.TextMeshPro","TMPro.TMP_FontAsset","UnityEngine.Font","UnityEngine.CapsuleCollider","Farmable","UnityEngine.MeshCollider","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.Button","UnityEngine.UI.Mask","TMPro.TextMeshProUGUI","PanelSharkWorlds","UnityEngine.GameObject","UnityEngine.UI.ScrollRect","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.Text","SharkWorldItem","SharkWorldProgressItem","PanelCTA_UI","UnityEngine.AI.NavMeshAgent","BotController","UnityEngine.SphereCollider","BombController","GameManager","PlayerController","UIManager","SoundManager","UnityEngine.AudioClip","UnityEngine.AudioSource","BotSpawner","TreeController","UnityEngine.AI.NavMeshObstacle","AnimateTexture","LumberCraft.PlayerInputController","UnityEngine.SpriteRenderer","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Outline","LocalizationReplacer","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","BuildingController","UnityEngine.Cubemap","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.ConstantForce","UnityEngine.Joint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.FixedJoint","UnityEngine.CharacterJoint","UnityEngine.ConfigurableJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","CFX_AutoStopLoopedEffect","CFX_LightFlicker","CFX_LightIntensityFade","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer"]

Deserializers.unityVersion = "2019.4.9f1";

Deserializers.applicationIdentifier = "com.funvai.tapfire";

Deserializers.disableAntiAliasing = true;

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

