/**
 * @version 1.0.7852.36862
 * @copyright anton
 * @compiler Bridge.NET 17.9.11-luna
 */
Bridge.assembly("UnityScriptsCompiler", function ($asm, globals) {
    "use strict";

    /*AnimateTexture start.*/
    Bridge.define("AnimateTexture", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            scrollSpeedX: 0,
            scrollSpeedY: 0,
            rend: null
        },
        methods: {
            /*AnimateTexture.Start start.*/
            Start: function () {
                this.rend = this.GetComponent(UnityEngine.Renderer);
            },
            /*AnimateTexture.Start end.*/

            /*AnimateTexture.FixedUpdate start.*/
            FixedUpdate: function () {
                var offsetX = UnityEngine.Time.time * this.scrollSpeedX;
                var offsetY = UnityEngine.Time.time * this.scrollSpeedY;
                this.rend.material.SetTextureOffset$1("_MainTex", new pc.Vec2( offsetX, offsetY ));
            },
            /*AnimateTexture.FixedUpdate end.*/


        }
    });
    /*AnimateTexture end.*/

    /*BombController start.*/
    Bridge.define("BombController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            speed: 0,
            upForce: 0,
            rb: null
        },
        methods: {
            /*BombController.Start start.*/
            Start: function () {
                this.rb = this.GetComponent(UnityEngine.Rigidbody);
            },
            /*BombController.Start end.*/

            /*BombController.Update start.*/
            Update: function () {

            },
            /*BombController.Update end.*/

            /*BombController.OnTriggerEnter start.*/
            OnTriggerEnter: function (other) {
                if (other.gameObject.CompareTag("ground")) {
                    UnityEngine.MonoBehaviour.Destroy(this.gameObject);
                    var pop = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, GameManager.instance.hitFX, this.transform.position.$clone(), pc.Quat.IDENTITY.clone());
                    pop.transform.localScale = pop.transform.localScale.$clone().scale( 2 );
                    this.Destroy(pop, 1.0);
                }
            },
            /*BombController.OnTriggerEnter end.*/


        }
    });
    /*BombController end.*/

    /*botClass start.*/
    Bridge.define("botClass", {
        $kind: "enum",
        statics: {
            fields: {
                follower: 0,
                shooter: 1,
                shooter4Dir: 2,
                sniper: 3,
                cloner: 4,
                bomber: 5
            }
        }
    });
    /*botClass end.*/

    /*BotController start.*/
    Bridge.define("BotController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            bc: 0,
            rb: null,
            damage: null,
            bulletTypes: null,
            target: null,
            lookRadius: 0,
            shootRadius: 0,
            health: 0,
            canAttack: false,
            attacked: false,
            dead: false,
            moveSpeed: 0,
            firePoint: null,
            shootDelay: 0,
            shootDelayMax: 0,
            ray: null,
            cloneLevel: 0,
            bombPrefab: null,
            bombRadius: 0,
            bombDelay: 0,
            bombDelayMax: 0
        },
        ctors: {
            init: function () {
                this.lookRadius = 25.0;
            }
        },
        methods: {
            /*BotController.Start start.*/
            Start: function () {
                //agent = GetComponent<NavMeshAgent>();

                this.target = GameManager.instance.player.transform;
                this.rb = this.GetComponent(UnityEngine.Rigidbody);
            },
            /*BotController.Start end.*/

            /*BotController.Update start.*/
            Update: function () {
                if (!GameManager.instance.startGame) {
                    return;
                }
                if (this.dead) {
                    return;
                }
                if (GameManager.instance.playerCon.dead) {
                    //agent.enabled = false;
                    return;
                }
                if (GameManager.instance.victory) {
                    return;
                }
                //if (!GameManager.instance.gameStart) return;

                var distance = pc.Vec3.distance( this.target.position, this.transform.position );
                if (distance <= this.lookRadius) {
                    if (this.bc === botClass.follower || this.bc === botClass.cloner) {
                        this.transform.LookAt(GameManager.instance.player.transform);
                        this.transform.position = this.transform.position.$clone().add( this.transform.forward.$clone().scale( this.moveSpeed ).scale( UnityEngine.Time.deltaTime ) );
                        //agent.SetDestination(target.position);
                        //if (distance <= agent.stoppingDistance + 2f)
                        //{
                        //    canAttack = true;

                        //    if (canAttack && !attacked)
                        //    {
                        //        StartCoroutine(HitPlayerRoutine());
                        //    }
                        //}
                        //if (distance <= agent.stoppingDistance)
                        //{
                        //    FaceTarget();
                        //}
                    }

                }
                if (this.bc === botClass.shooter) {
                    if (distance <= this.shootRadius) {
                        DG.Tweening.ShortcutExtensions.DOLookAt(this.transform, this.target.position.$clone(), 0.25);
                        this.ShootPlayer();
                    }
                }
                if (this.bc === botClass.sniper) {
                    if (distance <= this.shootRadius) {
                        DG.Tweening.ShortcutExtensions.DOLookAt(this.transform, this.target.position.$clone(), 0.25);
                        this.SnipePlayer();
                    } else {
                        this.ray.SetActive(false);
                    }
                }
                if (this.bc === botClass.bomber) {
                    if (distance <= this.bombRadius) {
                        DG.Tweening.ShortcutExtensions.DOLookAt(this.transform, this.target.position.$clone(), 0.25);
                        this.BombPlayer();
                    }
                }
            },
            /*BotController.Update end.*/

            /*BotController.FaceTarget start.*/
            FaceTarget: function () {
                var direction = (this.target.position.$clone().sub( this.transform.position )).clone().normalize().$clone();
                var lookRotation = new pc.Quat().setLookAt( new pc.Vec3( direction.x, 0, direction.z ), pc.Vec3.UP );
                this.transform.rotation = new pc.Quat().slerp( this.transform.rotation, lookRotation, UnityEngine.Time.deltaTime * 5 );
            },
            /*BotController.FaceTarget end.*/

            /*BotController.OnDrawGizmosSelected start.*/
            OnDrawGizmosSelected: function () {
                UnityEngine.Gizmos.color = new pc.Color( 1, 0, 0, 1 );
                UnityEngine.Gizmos.DrawWireSphere(this.transform.position.$clone(), this.lookRadius);
                UnityEngine.Gizmos.DrawWireSphere(this.transform.position.$clone(), this.shootRadius);
            },
            /*BotController.OnDrawGizmosSelected end.*/

            /*BotController.HitPlayerRoutine start.*/
            HitPlayerRoutine: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $t,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    this.canAttack = false;
                                        this.attacked = true;

                                        ($t = GameManager.instance.playerCon).health = ($t.health - this.damage[0]) | 0;
                                        UnityEngine.PlayerPrefs.SetInt(GameManager.instance.playerCon.healthKey, GameManager.instance.playerCon.health);
                                        UIManager.instance.healthBar.fillAmount = GameManager.instance.playerCon.health / GameManager.instance.playerCon.maxHealth;

                                        if (GameManager.instance.playerCon.health <= 0) {
                                            GameManager.instance.playerCon.anim.SetTrigger$1("die");
                                            GameManager.instance.playerCon.dead = true;
                                            GameManager.instance.playerCon.enabled = false;
                                            GameManager.instance.player.GetComponent(LumberCraft.PlayerInputController).enabled = false;
                                            //GameManager.instance.playerCon.myAgent.enabled = false;
                                            GameManager.instance.playerCon.rb.isKinematic = true;
                                            GameManager.instance.playerCon.muzzleFlash.SetActive(false);
                                            UIManager.instance.gamePanel.SetActive(false);

                                            if (GameManager.instance.gameOverPanelStatus === GameOverPanelStatus.on) {
                                                UIManager.instance.gameoverLosePanel.SetActive(true);
                                                UIManager.instance.gamePanel.SetActive(false);
                                            } else if (GameManager.instance.gameOverPanelStatus === GameOverPanelStatus.off) {
                                                UIManager.instance.OpenCTAPanelCallback();
                                            }

                                            //StartCoroutine(UIManager.instance.GameOverPanelDelayRoutine());
                                            //SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.GetRandomBotkillSFX());

                                            //GameManager.instance.playerCon.health = GameManager.instance.playerCon.maxHealth;
                                            //PlayerPrefs.SetInt(GameManager.instance.playerCon.healthKey, GameManager.instance.playerCon.health);
                                        }
                                        //GetComponentInChildren<Animator>().SetTrigger("isEating");
                                        //UIManager.instance.hurtFrame.SetActive(true);
                                        //SoundManager.Instance.PlaySFX(SoundManager.Instance.hitSFX);

                                        $enumerator.current = new UnityEngine.WaitForSeconds(0.35);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    //UIManager.instance.hurtFrame.SetActive(false);//fails to turn off sometimes 

                                        $enumerator.current = new UnityEngine.WaitForSeconds(2.0);
                                        $step = 2;
                                        return true;
                                }
                                case 2: {
                                    //UIManager.instance.hurtFrame.SetActive(false);
                                        this.canAttack = true;
                                        this.attacked = false;

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*BotController.HitPlayerRoutine end.*/

            /*BotController.OnTriggerEnter start.*/
            OnTriggerEnter: function (other) {
                if (other.gameObject.CompareTag("bullet")) {
                    var dmg = 1;
                    this.health = (this.health - dmg) | 0;

                    UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                    var pop = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, GameManager.instance.hitFX, this.transform.position.$clone(), pc.Quat.IDENTITY.clone());
                    this.Destroy(pop, 1.0);

                    DG.Tweening.ShortcutExtensions.DOShakeScale(this.transform, 0.2, 0.15);

                    if (this.health <= 0) {
                        this.Death();
                    }

                }
            },
            /*BotController.OnTriggerEnter end.*/

            /*BotController.ShootPlayer start.*/
            ShootPlayer: function () {
                this.shootDelay += UnityEngine.Time.deltaTime;
                if (this.shootDelay >= this.shootDelayMax) {
                    var bulletIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, this.bulletTypes[0], this.firePoint.position.$clone(), this.firePoint.rotation.$clone());
                    this.Destroy(bulletIns, 7.0);
                    this.shootDelay = 0;
                    SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.enemyShootSFX);
                }
            },
            /*BotController.ShootPlayer end.*/

            /*BotController.SnipePlayer start.*/
            SnipePlayer: function () {

                this.shootDelay += UnityEngine.Time.deltaTime;

                if (this.shootDelay >= 0.5 && this.shootDelay <= 1.5) {
                    this.ray.SetActive(true);
                }
                if (this.shootDelay >= this.shootDelayMax) {
                    var bulletIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, this.bulletTypes[0], this.firePoint.position.$clone(), this.firePoint.rotation.$clone());
                    bulletIns.GetComponent(BulletController).speed = 25;
                    this.Destroy(bulletIns, 7.0);
                    this.shootDelay = 0;
                    SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.sniperShotSFX);

                    this.ray.SetActive(false);
                }

            },
            /*BotController.SnipePlayer end.*/

            /*BotController.BombPlayer start.*/
            BombPlayer: function () {
                this.bombDelay += UnityEngine.Time.deltaTime;
                if (this.bombDelay >= this.bombDelayMax) {
                    var bombIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, this.bombPrefab, this.firePoint.position.$clone(), this.firePoint.rotation.$clone());
                    DG.Tweening.ShortcutExtensions.DOMoveX(bombIns.transform, this.target.position.x, 1.5);
                    DG.Tweening.ShortcutExtensions.DOMoveZ(bombIns.transform, this.target.position.z, 1.5);
                    DG.Tweening.TweenSettingsExtensions.SetLoops$1(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,UnityEngine.Vector3,DG.Tweening.Plugins.Options.VectorOptions), DG.Tweening.ShortcutExtensions.DOMoveY(bombIns.transform, this.transform.position.y + 7, 0.5), 2, DG.Tweening.LoopType.Yoyo);
                    DG.Tweening.ShortcutExtensions.DOColor$3(bombIns.transform.GetComponent(UnityEngine.MeshRenderer).material, new pc.Color( 1, 0, 0, 1 ), 2.0);
                    this.Destroy(bombIns, 7.0);
                    this.bombDelay = 0;
                    SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.enemyShootSFX);
                }
            },
            /*BotController.BombPlayer end.*/

            /*BotController.GiveDamage start.*/
            GiveDamage: function () {

            },
            /*BotController.GiveDamage end.*/

            /*BotController.Death start.*/
            Death: function () {
                var $t;
                GameManager.instance.playerCon.enemyContact = false;
                this.dead = true;
                this.gameObject.tag = "botDead";
                this.gameObject.layer = 11;
                //GetComponentInChildren<Animator>().SetTrigger("isDied");
                this.enabled = false;
                //agent.enabled = false;
                this.GetComponent(UnityEngine.Collider).enabled = false;
                this.rb.useGravity = false;
                GameManager.instance.player.GetComponent(PlayerController).canShoot = false;
                UnityEngine.MonoBehaviour.Destroy(this.gameObject);
                var hit = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, GameManager.instance.popFX, this.transform.position.$clone(), pc.Quat.IDENTITY.clone());
                //hit.GetComponent<ParticleSystem>().startColor=gameObject.GetComponent<MeshRenderer>().material.color;
                this.Destroy(hit, 1.0);
                var coinIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, GameManager.instance.coinPrefab, this.transform.position.$clone(), GameManager.instance.coinPrefab.transform.rotation.$clone());

                DG.Tweening.ShortcutExtensions.DOShakeRotation$2(UnityEngine.Camera.main.transform, 0.35, 1, 10, 90);

                SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.GetRandomBotkillSFX());

                if (UnityEngine.GameObject.op_Inequality(this.ray, null)) {
                    this.ray.SetActive(false);
                }

                if (this.bc === botClass.cloner && this.cloneLevel === 0) {
                    SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.enemyCloneSFX);

                    for (var i = 0; i < 2; i = (i + 1) | 0) {
                        var clone = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, BotSpawner.instance.enemy_cloner, this.transform.position.$clone(), BotSpawner.instance.enemy_cloner.transform.rotation.$clone());
                        clone.transform.localScale = new pc.Vec3( 1.5, 2, 1.5 );
                        clone.GetComponent(UnityEngine.MeshRenderer).material = BotSpawner.instance.clonerMat;
                        clone.GetComponent(BotController).cloneLevel = 1;
                        ($t = clone.GetComponent(BotController)).health = (Bridge.Int.div($t.health, 2)) | 0;
                    }
                }
                BotSpawner.possibleLimit = (BotSpawner.possibleLimit + 1) | 0;
                //GameManager.instance.CheckLevelProgression();

            },
            /*BotController.Death end.*/


        }
    });
    /*BotController end.*/

    /*BotSpawner start.*/
    Bridge.define("BotSpawner", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                instance: null,
                possibleLimit: 0
            }
        },
        fields: {
            enemySpawnPoint: null,
            enemy: null,
            sec: 0,
            downvalue: 0,
            upduration: 0,
            adjustvalue: 0,
            spawnTime: 0,
            spawnTimeMax: 0,
            enemyCount: 0,
            enemyCountMax: 0,
            enemy_cloner: null,
            clonerMat: null,
            enemyPosRandom: null,
            counter: 0
        },
        methods: {
            /*BotSpawner.Awake start.*/
            Awake: function () {
                if (UnityEngine.MonoBehaviour.op_Equality(BotSpawner.instance, null)) {
                    BotSpawner.instance = this;
                }
            },
            /*BotSpawner.Awake end.*/

            /*BotSpawner.Start start.*/
            Start: function () {
                BotSpawner.possibleLimit = 0;
                this.counter = 0;
                this.enemyPosRandom = this.UniqueRandomNumber(0, this.enemySpawnPoint.length);
                this.SpawnTimerController();
            },
            /*BotSpawner.Start end.*/

            /*BotSpawner.Update start.*/
            Update: function () {
                if (!GameManager.instance.startGame) {
                    return;
                }
                if (GameManager.instance.playerCon.dead) {
                    return;
                }
                if (GameManager.instance.victory) {
                    return;
                }
                //if (!GameManager.instance.gameStart) return;
                if (this.enemyCount <= this.enemyCountMax) {
                    this.spawnTime += UnityEngine.Time.deltaTime;
                    if (this.spawnTime >= this.spawnTimeMax) {
                        if (this.counter <= ((this.enemySpawnPoint.length - 1) | 0)) {
                            this.enemyCount = (this.enemyCount + 1) | 0;
                            var downpos = new pc.Vec3( this.enemySpawnPoint[this.enemyPosRandom[this.counter]].position.x, this.enemySpawnPoint[this.enemyPosRandom[this.counter]].position.y - this.downvalue, this.enemySpawnPoint[this.enemyPosRandom[this.counter]].position.z );

                            var botIns = UnityEngine.Object.Instantiate$3(UnityEngine.GameObject, this.enemy[UnityEngine.Random.Range(0, this.enemy.length)], downpos.$clone(), pc.Quat.IDENTITY.clone(), this.transform);
                            DG.Tweening.ShortcutExtensions.DOMoveY(botIns.transform, this.enemySpawnPoint[this.enemyPosRandom[this.counter]].position.y - this.adjustvalue, this.upduration);
                            var effect = this.enemySpawnPoint[this.enemyPosRandom[this.counter]].GetChild(0).gameObject;
                            effect.SetActive(true);
                            this.StartCoroutine$1(this.EffectOffEnemy(effect));
                            this.spawnTime = 0;
                            this.counter = (this.counter + 1) | 0;

                        } else {
                            if (this.counter === BotSpawner.possibleLimit) {
                                this.enemyPosRandom = this.UniqueRandomNumber(0, this.enemySpawnPoint.length);
                                BotSpawner.possibleLimit = 0;
                                this.counter = 0;
                            }
                        }

                    }
                }

            },
            /*BotSpawner.Update end.*/

            /*BotSpawner.UniqueRandomNumber start.*/
            UniqueRandomNumber: function (startNo, size) {
                var arr = System.Array.init(size, 0, System.Int32);
                var value = startNo;
                for (var i = 0; i < arr.length; i = (i + 1) | 0) {
                    arr[i] = value;
                    value = (value + 1) | 0;
                }
                var rand, temp;
                for (var i1 = 0; i1 < arr.length; i1 = (i1 + 1) | 0) {
                    rand = UnityEngine.Random.Range(0, arr.length);
                    temp = arr[rand];
                    arr[rand] = arr[i1];
                    arr[i1] = temp;
                }

                return arr;

            },
            /*BotSpawner.UniqueRandomNumber end.*/

            /*BotSpawner.SpawnTimerController start.*/
            SpawnTimerController: function () {
                //spawnTimeMax = 5;
                //spawnTimeMax = 5 - ((float)GameManager.instance.worldID / 2) - (float)GameManager.instance.levelID * 0.1f;

                //if (spawnTimeMax <= 1) spawnTimeMax = 1;
            },
            /*BotSpawner.SpawnTimerController end.*/

            /*BotSpawner.EffectOffEnemy start.*/
            EffectOffEnemy: function (go) {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new UnityEngine.WaitForSeconds(this.sec);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    go.SetActive(false);

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*BotSpawner.EffectOffEnemy end.*/


        }
    });
    /*BotSpawner end.*/

    /*BuildingController start.*/
    Bridge.define("BuildingController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            requiredWood: 0,
            isComplete: false,
            buildStages: null,
            txtReqWood: null,
            buildCanvas: null
        },
        methods: {
            /*BuildingController.Start start.*/
            Start: function () {
                //txtReqWood.text = requiredWood.ToString();
            },
            /*BuildingController.Start end.*/

            /*BuildingController.Update start.*/
            Update: function () {

            },
            /*BuildingController.Update end.*/


        }
    });
    /*BuildingController end.*/

    /*BulletController start.*/
    Bridge.define("BulletController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            speed: 0
        },
        methods: {
            /*BulletController.Start start.*/
            Start: function () {
                this.Destroy(this.gameObject, 4.0);
            },
            /*BulletController.Start end.*/

            /*BulletController.Update start.*/
            Update: function () {
                this.transform.position = this.transform.position.$clone().add( this.transform.forward.$clone().scale( this.speed ).scale( UnityEngine.Time.deltaTime ) );
            },
            /*BulletController.Update end.*/

            /*BulletController.OnTriggerEnter start.*/
            OnTriggerEnter: function (other) {
                var $t;
                if (other.gameObject.CompareTag("playerShield")) {
                    UnityEngine.MonoBehaviour.Destroy(this.gameObject);
                    UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                    var pop = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, GameManager.instance.hitFX, this.transform.position.$clone(), pc.Quat.IDENTITY.clone());
                    this.Destroy(pop, 1.0);
                    ($t = GameManager.instance.playerCon).shieldLevel = ($t.shieldLevel - 1) | 0;
                    if (GameManager.instance.playerCon.shieldLevel <= 0) {
                        GameManager.instance.playerCon.hasShield = false;
                    }
                }
                if (other.gameObject.CompareTag("Wall")) {
                    UnityEngine.MonoBehaviour.Destroy(this.gameObject);
                    var pop1 = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, GameManager.instance.hitFX, this.transform.position.$clone(), pc.Quat.IDENTITY.clone());
                    this.Destroy(pop1, 1.0);
                }
            },
            /*BulletController.OnTriggerEnter end.*/


        }
    });
    /*BulletController end.*/

    /*CameraController start.*/
    Bridge.define("CameraController", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                Instance: null
            },
            methods: {
                /*CameraController.SharedManager:static start.*/
                SharedManager: function () {
                    return CameraController.Instance;
                },
                /*CameraController.SharedManager:static end.*/


            }
        },
        fields: {
            target: null,
            offset: null,
            smoothFactor: 0,
            isTargetFound: false
        },
        ctors: {
            init: function () {
                this.offset = new UnityEngine.Vector3();
                this.isTargetFound = false;
            }
        },
        methods: {
            /*CameraController.Awake start.*/
            Awake: function () {
                if (!UnityEngine.Object.op_Implicit(CameraController.Instance)) {
                    CameraController.Instance = this;
                }
            },
            /*CameraController.Awake end.*/

            /*CameraController.LateUpdate start.*/
            LateUpdate: function () {
                if (UnityEngine.Component.op_Equality(this.target, null)) {
                    return;
                }
                if (UnityEngine.Object.op_Implicit(this.target) && this.isTargetFound === false) {
                    this.isTargetFound = true;
                }

                var desiredPosition = this.target.transform.position.$clone().add( this.offset );
                var smoothedPosition = new pc.Vec3().lerp( desiredPosition, this.transform.position, this.smoothFactor * UnityEngine.Time.deltaTime );
                this.transform.position = smoothedPosition.$clone();
                //transform.LookAt(target);
            },
            /*CameraController.LateUpdate end.*/


        }
    });
    /*CameraController end.*/

    /*CFX_AutoDestructShuriken start.*/
    Bridge.define("CFX_AutoDestructShuriken", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            OnlyDeactivate: false
        },
        methods: {
            /*CFX_AutoDestructShuriken.OnEnable start.*/
            OnEnable: function () {
                this.StartCoroutine$2("CheckIfAlive");
            },
            /*CFX_AutoDestructShuriken.OnEnable end.*/

            /*CFX_AutoDestructShuriken.CheckIfAlive start.*/
            CheckIfAlive: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    ps,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    ps = this.GetComponent(UnityEngine.ParticleSystem);
                                    $step = 1;
                                    continue;
                                }
                                case 1: {
                                    if ( true && UnityEngine.Component.op_Inequality(ps, null) ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 2: {
                                    $enumerator.current = new UnityEngine.WaitForSeconds(0.5);
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    if (!ps.IsAlive(true)) {
                                            if (this.OnlyDeactivate) {
                                                this.gameObject.SetActive(false);
                                            } else {
                                                UnityEngine.Object.Destroy(this.gameObject);
                                            }
                                            $step = 4;
                                            continue;
                                        }

                                        $step = 1;
                                        continue;
                                }
                                case 4: {

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*CFX_AutoDestructShuriken.CheckIfAlive end.*/


        }
    });
    /*CFX_AutoDestructShuriken end.*/

    /*CFX_AutoRotate start.*/
    Bridge.define("CFX_AutoRotate", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            rotation: null,
            space: 0
        },
        ctors: {
            init: function () {
                this.rotation = new UnityEngine.Vector3();
                this.space = UnityEngine.Space.Self;
            }
        },
        methods: {
            /*CFX_AutoRotate.Update start.*/
            Update: function () {
                this.transform.Rotate$2(this.rotation.$clone().scale( UnityEngine.Time.deltaTime ), this.space);
            },
            /*CFX_AutoRotate.Update end.*/


        }
    });
    /*CFX_AutoRotate end.*/

    /*CFX_AutoStopLoopedEffect start.*/
    Bridge.define("CFX_AutoStopLoopedEffect", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            effectDuration: 0,
            d: 0
        },
        ctors: {
            init: function () {
                this.effectDuration = 2.5;
            }
        },
        methods: {
            /*CFX_AutoStopLoopedEffect.OnEnable start.*/
            OnEnable: function () {
                this.d = this.effectDuration;
            },
            /*CFX_AutoStopLoopedEffect.OnEnable end.*/

            /*CFX_AutoStopLoopedEffect.Update start.*/
            Update: function () {
                if (this.d > 0) {
                    this.d -= UnityEngine.Time.deltaTime;
                    if (this.d <= 0) {
                        this.GetComponent(UnityEngine.ParticleSystem).Stop$1(true);

                        var translation = this.gameObject.GetComponent(CFX_Demo_Translate);
                        if (UnityEngine.MonoBehaviour.op_Inequality(translation, null)) {
                            translation.enabled = false;
                        }
                    }
                }
            },
            /*CFX_AutoStopLoopedEffect.Update end.*/


        }
    });
    /*CFX_AutoStopLoopedEffect end.*/

    /*CFX_Demo_New start.*/
    Bridge.define("CFX_Demo_New", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            groundRenderer: null,
            groundCollider: null,
            slowMoBtn: null,
            slowMoLabel: null,
            camRotBtn: null,
            camRotLabel: null,
            groundBtn: null,
            groundLabel: null,
            EffectLabel: null,
            EffectIndexLabel: null,
            ParticleExamples: null,
            exampleIndex: 0,
            slowMo: false,
            defaultCamPosition: null,
            defaultCamRotation: null,
            onScreenParticles: null
        },
        ctors: {
            init: function () {
                this.defaultCamPosition = new UnityEngine.Vector3();
                this.defaultCamRotation = new UnityEngine.Quaternion();
                this.onScreenParticles = new (System.Collections.Generic.List$1(UnityEngine.GameObject)).ctor();
            }
        },
        methods: {
            /*CFX_Demo_New.Awake start.*/
            Awake: function () {
                var particleExampleList = new (System.Collections.Generic.List$1(UnityEngine.GameObject)).ctor();
                var nbChild = this.transform.childCount;
                for (var i = 0; i < nbChild; i = (i + 1) | 0) {
                    var child = this.transform.GetChild(i).gameObject;
                    particleExampleList.add(child);
                }
                particleExampleList.Sort$2(function (o1, o2) {
                    return System.String.compare(o1.name, o2.name);
                });
                this.ParticleExamples = particleExampleList.ToArray();

                this.defaultCamPosition = UnityEngine.Camera.main.transform.position.$clone();
                this.defaultCamRotation = UnityEngine.Camera.main.transform.rotation.$clone();

                this.StartCoroutine$2("CheckForDeletedParticles");

                this.UpdateUI();
            },
            /*CFX_Demo_New.Awake end.*/

            /*CFX_Demo_New.Update start.*/
            Update: function () {
                if (UnityEngine.Input.GetKeyDown(UnityEngine.KeyCode.LeftArrow)) {
                    this.prevParticle();
                } else if (UnityEngine.Input.GetKeyDown(UnityEngine.KeyCode.RightArrow)) {
                    this.nextParticle();
                } else if (UnityEngine.Input.GetKeyDown(UnityEngine.KeyCode.Delete)) {
                    this.destroyParticles();
                }

                if (UnityEngine.Input.GetMouseButtonDown(0)) {
                    var hit = { v : new UnityEngine.RaycastHit.ctor() };
                    if (this.groundCollider.Raycast(UnityEngine.Camera.main.ScreenPointToRay(UnityEngine.Vector3.FromVector2(UnityEngine.Input.mousePosition.$clone())), hit, 9999.0)) {
                        var particle = this.spawnParticle();
                        particle.transform.position = hit.v.point.$clone().add( particle.transform.position );
                    }
                }

                var scroll = UnityEngine.Input.GetAxis("Mouse ScrollWheel");
                if (scroll !== 0.0) {
                    UnityEngine.Camera.main.transform.Translate$1(new pc.Vec3( 0, 0, 1 ).scale( (scroll < 0.0 ? -1.0 : 1.0) ), UnityEngine.Space.Self);
                }

                if (UnityEngine.Input.GetMouseButtonDown(2)) {
                    UnityEngine.Camera.main.transform.position = this.defaultCamPosition.$clone();
                    UnityEngine.Camera.main.transform.rotation = this.defaultCamRotation.$clone();
                }
            },
            /*CFX_Demo_New.Update end.*/

            /*CFX_Demo_New.OnToggleGround start.*/
            OnToggleGround: function () {
                var c = new pc.Color( 1, 1, 1, 1 );
                this.groundRenderer.enabled = !this.groundRenderer.enabled;
                c.a = this.groundRenderer.enabled ? 1.0 : 0.33;
                this.groundBtn.color = c.$clone();
                this.groundLabel.color = c.$clone();
            },
            /*CFX_Demo_New.OnToggleGround end.*/

            /*CFX_Demo_New.OnToggleCamera start.*/
            OnToggleCamera: function () {
                var c = new pc.Color( 1, 1, 1, 1 );
                CFX_Demo_RotateCamera.rotating = !CFX_Demo_RotateCamera.rotating;
                c.a = CFX_Demo_RotateCamera.rotating ? 1.0 : 0.33;
                this.camRotBtn.color = c.$clone();
                this.camRotLabel.color = c.$clone();
            },
            /*CFX_Demo_New.OnToggleCamera end.*/

            /*CFX_Demo_New.OnToggleSlowMo start.*/
            OnToggleSlowMo: function () {
                var c = new pc.Color( 1, 1, 1, 1 );

                this.slowMo = !this.slowMo;
                if (this.slowMo) {
                    UnityEngine.Time.timeScale = 0.33;
                    c.a = 1.0;
                } else {
                    UnityEngine.Time.timeScale = 1.0;
                    c.a = 0.33;
                }

                this.slowMoBtn.color = c.$clone();
                this.slowMoLabel.color = c.$clone();
            },
            /*CFX_Demo_New.OnToggleSlowMo end.*/

            /*CFX_Demo_New.OnPreviousEffect start.*/
            OnPreviousEffect: function () {
                this.prevParticle();
            },
            /*CFX_Demo_New.OnPreviousEffect end.*/

            /*CFX_Demo_New.OnNextEffect start.*/
            OnNextEffect: function () {
                this.nextParticle();
            },
            /*CFX_Demo_New.OnNextEffect end.*/

            /*CFX_Demo_New.UpdateUI start.*/
            UpdateUI: function () {
                this.EffectLabel.text = this.ParticleExamples[this.exampleIndex].name;
                this.EffectIndexLabel.text = System.String.format("{0}/{1}", System.Int32.format((((this.exampleIndex + 1) | 0)), "00"), System.Int32.format(this.ParticleExamples.length, "00"));
            },
            /*CFX_Demo_New.UpdateUI end.*/

            /*CFX_Demo_New.spawnParticle start.*/
            spawnParticle: function () {
                var particles = UnityEngine.Object.Instantiate(UnityEngine.GameObject, this.ParticleExamples[this.exampleIndex]);
                particles.transform.position = new pc.Vec3( 0, particles.transform.position.y, 0 );
                particles.SetActive(true);
                //			for(int i = 0; i < particles.transform.childCount; i++)
                //				particles.transform.GetChild(i).gameObject.SetActive(true);

                var ps = particles.GetComponent(UnityEngine.ParticleSystem);

                if (UnityEngine.Component.op_Inequality(ps, null)) {
                    var main = ps.main;
                    if (main.loop) {
                        ps.gameObject.AddComponent(CFX_AutoStopLoopedEffect);
                        ps.gameObject.AddComponent(CFX_AutoDestructShuriken);
                    }
                }

                this.onScreenParticles.add(particles);

                return particles;
            },
            /*CFX_Demo_New.spawnParticle end.*/

            /*CFX_Demo_New.CheckForDeletedParticles start.*/
            CheckForDeletedParticles: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    if ( true ) {
                                            $step = 1;
                                            continue;
                                        } 
                                        $step = 3;
                                        continue;
                                }
                                case 1: {
                                    $enumerator.current = new UnityEngine.WaitForSeconds(5.0);
                                        $step = 2;
                                        return true;
                                }
                                case 2: {
                                    for (var i = (this.onScreenParticles.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                                            if (UnityEngine.GameObject.op_Equality(this.onScreenParticles.getItem(i), null)) {
                                                this.onScreenParticles.removeAt(i);
                                            }
                                        }

                                        $step = 0;
                                        continue;
                                }
                                case 3: {

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*CFX_Demo_New.CheckForDeletedParticles end.*/

            /*CFX_Demo_New.prevParticle start.*/
            prevParticle: function () {
                this.exampleIndex = (this.exampleIndex - 1) | 0;
                if (this.exampleIndex < 0) {
                    this.exampleIndex = (this.ParticleExamples.length - 1) | 0;
                }

                this.UpdateUI();
            },
            /*CFX_Demo_New.prevParticle end.*/

            /*CFX_Demo_New.nextParticle start.*/
            nextParticle: function () {
                this.exampleIndex = (this.exampleIndex + 1) | 0;
                if (this.exampleIndex >= this.ParticleExamples.length) {
                    this.exampleIndex = 0;
                }

                this.UpdateUI();
            },
            /*CFX_Demo_New.nextParticle end.*/

            /*CFX_Demo_New.destroyParticles start.*/
            destroyParticles: function () {
                for (var i = (this.onScreenParticles.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                    if (UnityEngine.GameObject.op_Inequality(this.onScreenParticles.getItem(i), null)) {
                        UnityEngine.Object.Destroy(this.onScreenParticles.getItem(i));
                    }

                    this.onScreenParticles.removeAt(i);
                }
            },
            /*CFX_Demo_New.destroyParticles end.*/


        }
    });
    /*CFX_Demo_New end.*/

    /*CFX_Demo_RandomDir start.*/
    Bridge.define("CFX_Demo_RandomDir", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            min: null,
            max: null
        },
        ctors: {
            init: function () {
                this.min = new UnityEngine.Vector3();
                this.max = new UnityEngine.Vector3();
                this.min = new pc.Vec3( 0, 0, 0 );
                this.max = new pc.Vec3( 0, 360, 0 );
            }
        },
        methods: {
            /*CFX_Demo_RandomDir.Start start.*/
            Start: function () {
                this.transform.eulerAngles = new pc.Vec3( UnityEngine.Random.Range$1(this.min.x, this.max.x), UnityEngine.Random.Range$1(this.min.y, this.max.y), UnityEngine.Random.Range$1(this.min.z, this.max.z) );
            },
            /*CFX_Demo_RandomDir.Start end.*/


        }
    });
    /*CFX_Demo_RandomDir end.*/

    /*CFX_Demo_RandomDirectionTranslate start.*/
    Bridge.define("CFX_Demo_RandomDirectionTranslate", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            speed: 0,
            baseDir: null,
            axis: null,
            gravity: false,
            dir: null
        },
        ctors: {
            init: function () {
                this.baseDir = new UnityEngine.Vector3();
                this.axis = new UnityEngine.Vector3();
                this.dir = new UnityEngine.Vector3();
                this.speed = 30.0;
                this.baseDir = pc.Vec3.ZERO.clone();
                this.axis = new pc.Vec3( 0, 0, 1 );
            }
        },
        methods: {
            /*CFX_Demo_RandomDirectionTranslate.Start start.*/
            Start: function () {
                this.dir = new pc.Vec3( UnityEngine.Random.Range$1(0.0, 360.0), UnityEngine.Random.Range$1(0.0, 360.0), UnityEngine.Random.Range$1(0.0, 360.0) ).clone().normalize().$clone();
                this.dir.mul( this.axis );
                this.dir = this.dir.$clone().add( this.baseDir.$clone() );
            },
            /*CFX_Demo_RandomDirectionTranslate.Start end.*/

            /*CFX_Demo_RandomDirectionTranslate.Update start.*/
            Update: function () {
                this.transform.Translate$1(this.dir.$clone().scale( this.speed ).scale( UnityEngine.Time.deltaTime ));

                if (this.gravity) {
                    this.transform.Translate$1(UnityEngine.Physics.gravity.$clone().scale( UnityEngine.Time.deltaTime ));
                }
            },
            /*CFX_Demo_RandomDirectionTranslate.Update end.*/


        }
    });
    /*CFX_Demo_RandomDirectionTranslate end.*/

    /*CFX_Demo_RotateCamera start.*/
    Bridge.define("CFX_Demo_RotateCamera", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                rotating: false
            },
            ctors: {
                init: function () {
                    this.rotating = true;
                }
            }
        },
        fields: {
            speed: 0,
            rotationCenter: null
        },
        ctors: {
            init: function () {
                this.speed = 30.0;
            }
        },
        methods: {
            /*CFX_Demo_RotateCamera.Update start.*/
            Update: function () {
                if (CFX_Demo_RotateCamera.rotating) {
                    this.transform.RotateAround(this.rotationCenter.position.$clone(), pc.Vec3.UP.clone(), this.speed * UnityEngine.Time.deltaTime);
                }
            },
            /*CFX_Demo_RotateCamera.Update end.*/


        }
    });
    /*CFX_Demo_RotateCamera end.*/

    /*CFX_Demo_Translate start.*/
    Bridge.define("CFX_Demo_Translate", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            speed: 0,
            rotation: null,
            axis: null,
            gravity: false,
            dir: null
        },
        ctors: {
            init: function () {
                this.rotation = new UnityEngine.Vector3();
                this.axis = new UnityEngine.Vector3();
                this.dir = new UnityEngine.Vector3();
                this.speed = 30.0;
                this.rotation = new pc.Vec3( 0, 0, 1 );
                this.axis = new pc.Vec3( 0, 0, 1 );
            }
        },
        methods: {
            /*CFX_Demo_Translate.Start start.*/
            Start: function () {
                this.dir = new pc.Vec3( UnityEngine.Random.Range$1(0.0, 360.0), UnityEngine.Random.Range$1(0.0, 360.0), UnityEngine.Random.Range$1(0.0, 360.0) );
                this.dir.mul( this.rotation );
                this.transform.localEulerAngles = this.dir.$clone();
            },
            /*CFX_Demo_Translate.Start end.*/

            /*CFX_Demo_Translate.Update start.*/
            Update: function () {
                this.transform.Translate$1(this.axis.$clone().scale( this.speed ).scale( UnityEngine.Time.deltaTime ), UnityEngine.Space.Self);
            },
            /*CFX_Demo_Translate.Update end.*/


        }
    });
    /*CFX_Demo_Translate end.*/

    /*CFX_LightFlicker start.*/
    Bridge.define("CFX_LightFlicker", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            loop: false,
            smoothFactor: 0,
            /**
             * @instance
             * @public
             * @memberof CFX_LightFlicker
             * @default 1.0
             * @type number
             */
            addIntensity: 0,
            minIntensity: 0,
            maxIntensity: 0,
            baseIntensity: 0
        },
        ctors: {
            init: function () {
                this.smoothFactor = 1.0;
                this.addIntensity = 1.0;
            }
        },
        methods: {
            /*CFX_LightFlicker.Awake start.*/
            Awake: function () {
                this.baseIntensity = this.GetComponent(UnityEngine.Light).intensity;
            },
            /*CFX_LightFlicker.Awake end.*/

            /*CFX_LightFlicker.OnEnable start.*/
            OnEnable: function () {
                this.minIntensity = this.baseIntensity;
                this.maxIntensity = this.minIntensity + this.addIntensity;
            },
            /*CFX_LightFlicker.OnEnable end.*/

            /*CFX_LightFlicker.Update start.*/
            Update: function () {
                this.GetComponent(UnityEngine.Light).intensity = pc.math.lerp(this.minIntensity, this.maxIntensity, pc.noise.perlin2(UnityEngine.Time.time * this.smoothFactor, 0.0));
            },
            /*CFX_LightFlicker.Update end.*/


        }
    });
    /*CFX_LightFlicker end.*/

    /*CFX_LightIntensityFade start.*/
    Bridge.define("CFX_LightIntensityFade", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            duration: 0,
            delay: 0,
            /**
             * @instance
             * @public
             * @memberof CFX_LightIntensityFade
             * @default 0.0
             * @type number
             */
            finalIntensity: 0,
            baseIntensity: 0,
            autodestruct: false,
            p_lifetime: 0,
            p_delay: 0
        },
        ctors: {
            init: function () {
                this.duration = 1.0;
                this.delay = 0.0;
                this.finalIntensity = 0.0;
                this.p_lifetime = 0.0;
            }
        },
        methods: {
            /*CFX_LightIntensityFade.Start start.*/
            Start: function () {
                this.baseIntensity = this.GetComponent(UnityEngine.Light).intensity;
            },
            /*CFX_LightIntensityFade.Start end.*/

            /*CFX_LightIntensityFade.OnEnable start.*/
            OnEnable: function () {
                this.p_lifetime = 0.0;
                this.p_delay = this.delay;
                if (this.delay > 0) {
                    this.GetComponent(UnityEngine.Light).enabled = false;
                }
            },
            /*CFX_LightIntensityFade.OnEnable end.*/

            /*CFX_LightIntensityFade.Update start.*/
            Update: function () {
                if (this.p_delay > 0) {
                    this.p_delay -= UnityEngine.Time.deltaTime;
                    if (this.p_delay <= 0) {
                        this.GetComponent(UnityEngine.Light).enabled = true;
                    }
                    return;
                }

                if (this.p_lifetime / this.duration < 1.0) {
                    this.GetComponent(UnityEngine.Light).intensity = pc.math.lerp(this.baseIntensity, this.finalIntensity, this.p_lifetime / this.duration);
                    this.p_lifetime += UnityEngine.Time.deltaTime;
                } else {
                    if (this.autodestruct) {
                        UnityEngine.Object.Destroy(this.gameObject);
                    }
                }

            },
            /*CFX_LightIntensityFade.Update end.*/


        }
    });
    /*CFX_LightIntensityFade end.*/

    /*DG.Tweening.DOTweenCYInstruction start.*/
    Bridge.define("DG.Tweening.DOTweenCYInstruction");
    /*DG.Tweening.DOTweenCYInstruction end.*/

    /*DG.Tweening.DOTweenCYInstruction+WaitForCompletion start.*/
    Bridge.define("DG.Tweening.DOTweenCYInstruction.WaitForCompletion", {
        inherits: [UnityEngine.CustomYieldInstruction],
        $kind: "nested class",
        fields: {
            t: null
        },
        props: {
            keepWaiting: {
                get: function () {
                    return this.t.active && !DG.Tweening.TweenExtensions.IsComplete(this.t);
                }
            }
        },
        ctors: {
            ctor: function (tween) {
                this.$initialize();
                UnityEngine.CustomYieldInstruction.ctor.call(this);
                this.t = tween;
            }
        }
    });
    /*DG.Tweening.DOTweenCYInstruction+WaitForCompletion end.*/

    /*DG.Tweening.DOTweenCYInstruction+WaitForElapsedLoops start.*/
    Bridge.define("DG.Tweening.DOTweenCYInstruction.WaitForElapsedLoops", {
        inherits: [UnityEngine.CustomYieldInstruction],
        $kind: "nested class",
        fields: {
            t: null,
            elapsedLoops: 0
        },
        props: {
            keepWaiting: {
                get: function () {
                    return this.t.active && DG.Tweening.TweenExtensions.CompletedLoops(this.t) < this.elapsedLoops;
                }
            }
        },
        ctors: {
            ctor: function (tween, elapsedLoops) {
                this.$initialize();
                UnityEngine.CustomYieldInstruction.ctor.call(this);
                this.t = tween;
                this.elapsedLoops = elapsedLoops;
            }
        }
    });
    /*DG.Tweening.DOTweenCYInstruction+WaitForElapsedLoops end.*/

    /*DG.Tweening.DOTweenCYInstruction+WaitForKill start.*/
    Bridge.define("DG.Tweening.DOTweenCYInstruction.WaitForKill", {
        inherits: [UnityEngine.CustomYieldInstruction],
        $kind: "nested class",
        fields: {
            t: null
        },
        props: {
            keepWaiting: {
                get: function () {
                    return this.t.active;
                }
            }
        },
        ctors: {
            ctor: function (tween) {
                this.$initialize();
                UnityEngine.CustomYieldInstruction.ctor.call(this);
                this.t = tween;
            }
        }
    });
    /*DG.Tweening.DOTweenCYInstruction+WaitForKill end.*/

    /*DG.Tweening.DOTweenCYInstruction+WaitForPosition start.*/
    Bridge.define("DG.Tweening.DOTweenCYInstruction.WaitForPosition", {
        inherits: [UnityEngine.CustomYieldInstruction],
        $kind: "nested class",
        fields: {
            t: null,
            position: 0
        },
        props: {
            keepWaiting: {
                get: function () {
                    return this.t.active && this.t.position * (((DG.Tweening.TweenExtensions.CompletedLoops(this.t) + 1) | 0)) < this.position;
                }
            }
        },
        ctors: {
            ctor: function (tween, position) {
                this.$initialize();
                UnityEngine.CustomYieldInstruction.ctor.call(this);
                this.t = tween;
                this.position = position;
            }
        }
    });
    /*DG.Tweening.DOTweenCYInstruction+WaitForPosition end.*/

    /*DG.Tweening.DOTweenCYInstruction+WaitForRewind start.*/
    Bridge.define("DG.Tweening.DOTweenCYInstruction.WaitForRewind", {
        inherits: [UnityEngine.CustomYieldInstruction],
        $kind: "nested class",
        fields: {
            t: null
        },
        props: {
            keepWaiting: {
                get: function () {
                    return this.t.active && (!this.t.playedOnce || this.t.position * (((DG.Tweening.TweenExtensions.CompletedLoops(this.t) + 1) | 0)) > 0);
                }
            }
        },
        ctors: {
            ctor: function (tween) {
                this.$initialize();
                UnityEngine.CustomYieldInstruction.ctor.call(this);
                this.t = tween;
            }
        }
    });
    /*DG.Tweening.DOTweenCYInstruction+WaitForRewind end.*/

    /*DG.Tweening.DOTweenCYInstruction+WaitForStart start.*/
    Bridge.define("DG.Tweening.DOTweenCYInstruction.WaitForStart", {
        inherits: [UnityEngine.CustomYieldInstruction],
        $kind: "nested class",
        fields: {
            t: null
        },
        props: {
            keepWaiting: {
                get: function () {
                    return this.t.active && !this.t.playedOnce;
                }
            }
        },
        ctors: {
            ctor: function (tween) {
                this.$initialize();
                UnityEngine.CustomYieldInstruction.ctor.call(this);
                this.t = tween;
            }
        }
    });
    /*DG.Tweening.DOTweenCYInstruction+WaitForStart end.*/

    /*DG.Tweening.DOTweenModuleAudio start.*/
    Bridge.define("DG.Tweening.DOTweenModuleAudio", {
        statics: {
            methods: {
                /*DG.Tweening.DOTweenModuleAudio.DOFade:static start.*/
                /**
                 * Tweens an AudioSource's volume to the given value.
                 Also stores the AudioSource as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.AudioSource}           target      
                 * @param   {number}                            endValue    The end value to reach (0 to 1)
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOFade: function (target, endValue, duration) {
                    if (endValue < 0) {
                        endValue = 0;
                    } else {
                        if (endValue > 1) {
                            endValue = 1;
                        }
                    }
                    var t = DG.Tweening.DOTween.To$4(function () {
                        return target.volume;
                    }, function (x) {
                        target.volume = x;
                    }, endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(System.Single,System.Single,DG.Tweening.Plugins.Options.FloatOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleAudio.DOFade:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DOPitch:static start.*/
                /**
                 * Tweens an AudioSource's pitch to the given value.
                 Also stores the AudioSource as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.AudioSource}           target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOPitch: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.To$4(function () {
                        return target.pitch;
                    }, function (x) {
                        target.pitch = x;
                    }, endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(System.Single,System.Single,DG.Tweening.Plugins.Options.FloatOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleAudio.DOPitch:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DOSetFloat:static start.*/
                /**
                 * Tweens an AudioMixer's exposed float to the given value.
                 Also stores the AudioMixer as the tween's target so it can be used for filtered operations.
                 Note that you need to manually expose a float in an AudioMixerGroup in order to be able to tween it from an AudioMixer.
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.Audio.AudioMixer}      target       
                 * @param   {string}                            floatName    Name given to the exposed float to set
                 * @param   {number}                            endValue     The end value to reach
                 * @param   {number}                            duration     The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOSetFloat: function (target, floatName, endValue, duration) {
                    var t = DG.Tweening.DOTween.To$4(function () {
                        var currVal = { };
                        target.GetFloat(floatName, currVal);
                        return currVal.v;
                    }, function (x) {
                        target.SetFloat(floatName, x);
                    }, endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(System.Single,System.Single,DG.Tweening.Plugins.Options.FloatOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleAudio.DOSetFloat:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DOComplete:static start.*/
                /**
                 * Completes all tweens that have this target as a reference
                 (meaning tweens that were started from this target, or that had this target added as an Id)
                 and returns the total number of tweens completed
                 (meaning the tweens that don't have infinite loops and were not already complete)
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.Audio.AudioMixer}    target           
                 * @param   {boolean}                         withCallbacks    For Sequences only: if TRUE also internal Sequence callbacks will be fired,
                 otherwise they will be ignored
                 * @return  {number}
                 */
                DOComplete: function (target, withCallbacks) {
                    if (withCallbacks === void 0) { withCallbacks = false; }
                    return DG.Tweening.DOTween.Complete(target, withCallbacks);
                },
                /*DG.Tweening.DOTweenModuleAudio.DOComplete:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DOKill:static start.*/
                /**
                 * Kills all tweens that have this target as a reference
                 (meaning tweens that were started from this target, or that had this target added as an Id)
                 and returns the total number of tweens killed.
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.Audio.AudioMixer}    target      
                 * @param   {boolean}                         complete    If TRUE completes the tween before killing it
                 * @return  {number}
                 */
                DOKill: function (target, complete) {
                    if (complete === void 0) { complete = false; }
                    return DG.Tweening.DOTween.Kill(target, complete);
                },
                /*DG.Tweening.DOTweenModuleAudio.DOKill:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DOFlip:static start.*/
                /**
                 * Flips the direction (backwards if it was going forward or viceversa) of all tweens that have this target as a reference
                 (meaning tweens that were started from this target, or that had this target added as an Id)
                 and returns the total number of tweens flipped.
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.Audio.AudioMixer}    target
                 * @return  {number}
                 */
                DOFlip: function (target) {
                    return DG.Tweening.DOTween.Flip(target);
                },
                /*DG.Tweening.DOTweenModuleAudio.DOFlip:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DOGoto:static start.*/
                /**
                 * Sends to the given position all tweens that have this target as a reference
                 (meaning tweens that were started from this target, or that had this target added as an Id)
                 and returns the total number of tweens involved.
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.Audio.AudioMixer}    target     
                 * @param   {number}                          to         Time position to reach
                 (if higher than the whole tween duration the tween will simply reach its end)
                 * @param   {boolean}                         andPlay    If TRUE will play the tween after reaching the given position, otherwise it will pause it
                 * @return  {number}
                 */
                DOGoto: function (target, to, andPlay) {
                    if (andPlay === void 0) { andPlay = false; }
                    return DG.Tweening.DOTween.Goto(target, to, andPlay);
                },
                /*DG.Tweening.DOTweenModuleAudio.DOGoto:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DOPause:static start.*/
                /**
                 * Pauses all tweens that have this target as a reference
                 (meaning tweens that were started from this target, or that had this target added as an Id)
                 and returns the total number of tweens paused.
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.Audio.AudioMixer}    target
                 * @return  {number}
                 */
                DOPause: function (target) {
                    return DG.Tweening.DOTween.Pause(target);
                },
                /*DG.Tweening.DOTweenModuleAudio.DOPause:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DOPlay:static start.*/
                /**
                 * Plays all tweens that have this target as a reference
                 (meaning tweens that were started from this target, or that had this target added as an Id)
                 and returns the total number of tweens played.
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.Audio.AudioMixer}    target
                 * @return  {number}
                 */
                DOPlay: function (target) {
                    return DG.Tweening.DOTween.Play(target);
                },
                /*DG.Tweening.DOTweenModuleAudio.DOPlay:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DOPlayBackwards:static start.*/
                /**
                 * Plays backwards all tweens that have this target as a reference
                 (meaning tweens that were started from this target, or that had this target added as an Id)
                 and returns the total number of tweens played.
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.Audio.AudioMixer}    target
                 * @return  {number}
                 */
                DOPlayBackwards: function (target) {
                    return DG.Tweening.DOTween.PlayBackwards(target);
                },
                /*DG.Tweening.DOTweenModuleAudio.DOPlayBackwards:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DOPlayForward:static start.*/
                /**
                 * Plays forward all tweens that have this target as a reference
                 (meaning tweens that were started from this target, or that had this target added as an Id)
                 and returns the total number of tweens played.
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.Audio.AudioMixer}    target
                 * @return  {number}
                 */
                DOPlayForward: function (target) {
                    return DG.Tweening.DOTween.PlayForward(target);
                },
                /*DG.Tweening.DOTweenModuleAudio.DOPlayForward:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DORestart:static start.*/
                /**
                 * Restarts all tweens that have this target as a reference
                 (meaning tweens that were started from this target, or that had this target added as an Id)
                 and returns the total number of tweens restarted.
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.Audio.AudioMixer}    target
                 * @return  {number}
                 */
                DORestart: function (target) {
                    return DG.Tweening.DOTween.Restart(target);
                },
                /*DG.Tweening.DOTweenModuleAudio.DORestart:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DORewind:static start.*/
                /**
                 * Rewinds all tweens that have this target as a reference
                 (meaning tweens that were started from this target, or that had this target added as an Id)
                 and returns the total number of tweens rewinded.
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.Audio.AudioMixer}    target
                 * @return  {number}
                 */
                DORewind: function (target) {
                    return DG.Tweening.DOTween.Rewind(target);
                },
                /*DG.Tweening.DOTweenModuleAudio.DORewind:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DOSmoothRewind:static start.*/
                /**
                 * Smoothly rewinds all tweens that have this target as a reference
                 (meaning tweens that were started from this target, or that had this target added as an Id)
                 and returns the total number of tweens rewinded.
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.Audio.AudioMixer}    target
                 * @return  {number}
                 */
                DOSmoothRewind: function (target) {
                    return DG.Tweening.DOTween.SmoothRewind(target);
                },
                /*DG.Tweening.DOTweenModuleAudio.DOSmoothRewind:static end.*/

                /*DG.Tweening.DOTweenModuleAudio.DOTogglePause:static start.*/
                /**
                 * Toggles the paused state (plays if it was paused, pauses if it was playing) of all tweens that have this target as a reference
                 (meaning tweens that were started from this target, or that had this target added as an Id)
                 and returns the total number of tweens involved.
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleAudio
                 * @memberof DG.Tweening.DOTweenModuleAudio
                 * @param   {UnityEngine.Audio.AudioMixer}    target
                 * @return  {number}
                 */
                DOTogglePause: function (target) {
                    return DG.Tweening.DOTween.TogglePause(target);
                },
                /*DG.Tweening.DOTweenModuleAudio.DOTogglePause:static end.*/


            }
        }
    });
    /*DG.Tweening.DOTweenModuleAudio end.*/

    /*DG.Tweening.DOTweenModulePhysics start.*/
    Bridge.define("DG.Tweening.DOTweenModulePhysics", {
        statics: {
            methods: {
                /*DG.Tweening.DOTweenModulePhysics.DOMove:static start.*/
                /**
                 * Tweens a Rigidbody's position to the given value.
                 Also stores the rigidbody as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics
                 * @memberof DG.Tweening.DOTweenModulePhysics
                 * @param   {UnityEngine.Rigidbody}             target      
                 * @param   {UnityEngine.Vector3}               endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOMove: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$12(function () {
                        return target.position;
                    }, Bridge.fn.cacheBind(target, target.MovePosition), endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$13(t, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics.DOMove:static end.*/

                /*DG.Tweening.DOTweenModulePhysics.DOMoveX:static start.*/
                /**
                 * Tweens a Rigidbody's X position to the given value.
                 Also stores the rigidbody as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics
                 * @memberof DG.Tweening.DOTweenModulePhysics
                 * @param   {UnityEngine.Rigidbody}             target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOMoveX: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$12(function () {
                        return target.position;
                    }, Bridge.fn.cacheBind(target, target.MovePosition), new pc.Vec3( endValue, 0, 0 ), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$12(t, DG.Tweening.AxisConstraint.X, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics.DOMoveX:static end.*/

                /*DG.Tweening.DOTweenModulePhysics.DOMoveY:static start.*/
                /**
                 * Tweens a Rigidbody's Y position to the given value.
                 Also stores the rigidbody as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics
                 * @memberof DG.Tweening.DOTweenModulePhysics
                 * @param   {UnityEngine.Rigidbody}             target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOMoveY: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$12(function () {
                        return target.position;
                    }, Bridge.fn.cacheBind(target, target.MovePosition), new pc.Vec3( 0, endValue, 0 ), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$12(t, DG.Tweening.AxisConstraint.Y, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics.DOMoveY:static end.*/

                /*DG.Tweening.DOTweenModulePhysics.DOMoveZ:static start.*/
                /**
                 * Tweens a Rigidbody's Z position to the given value.
                 Also stores the rigidbody as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics
                 * @memberof DG.Tweening.DOTweenModulePhysics
                 * @param   {UnityEngine.Rigidbody}             target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOMoveZ: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$12(function () {
                        return target.position;
                    }, Bridge.fn.cacheBind(target, target.MovePosition), new pc.Vec3( 0, 0, endValue ), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$12(t, DG.Tweening.AxisConstraint.Z, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics.DOMoveZ:static end.*/

                /*DG.Tweening.DOTweenModulePhysics.DORotate:static start.*/
                /**
                 * Tweens a Rigidbody's rotation to the given value.
                 Also stores the rigidbody as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics
                 * @memberof DG.Tweening.DOTweenModulePhysics
                 * @param   {UnityEngine.Rigidbody}             target      
                 * @param   {UnityEngine.Vector3}               endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {DG.Tweening.RotateMode}            mode        Rotation mode
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DORotate: function (target, endValue, duration, mode) {
                    if (mode === void 0) { mode = 0; }
                    var t = DG.Tweening.DOTween.To$9(function () {
                        return target.rotation;
                    }, Bridge.fn.cacheBind(target, target.MoveRotation), endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Quaternion,UnityEngine.Vector3,DG.Tweening.Plugins.Options.QuaternionOptions), t, target);
                    t.plugOptions.rotateMode = mode;
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics.DORotate:static end.*/

                /*DG.Tweening.DOTweenModulePhysics.DOLookAt:static start.*/
                /**
                 * Tweens a Rigidbody's rotation so that it will look towards the given position.
                 Also stores the rigidbody as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics
                 * @memberof DG.Tweening.DOTweenModulePhysics
                 * @param   {UnityEngine.Rigidbody}             target            
                 * @param   {UnityEngine.Vector3}               towards           The position to look at
                 * @param   {number}                            duration          The duration of the tween
                 * @param   {DG.Tweening.AxisConstraint}        axisConstraint    Eventual axis constraint for the rotation
                 * @param   {?UnityEngine.Vector3}              up                The vector that defines in which direction up is (default: Vector3.up)
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOLookAt: function (target, towards, duration, axisConstraint, up) {
                    if (axisConstraint === void 0) { axisConstraint = 0; }
                    if (up === void 0) { up = null; }
                    var t = DG.Tweening.Core.Extensions.SetSpecialStartupMode(DG.Tweening.Core.TweenerCore$3(UnityEngine.Quaternion,UnityEngine.Vector3,DG.Tweening.Plugins.Options.QuaternionOptions), DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Quaternion,UnityEngine.Vector3,DG.Tweening.Plugins.Options.QuaternionOptions), DG.Tweening.DOTween.To$9(function () {
                        return target.rotation;
                    }, Bridge.fn.cacheBind(target, target.MoveRotation), towards.$clone(), duration), target), DG.Tweening.Core.Enums.SpecialStartupMode.SetLookAt);
                    t.plugOptions.axisConstraint = axisConstraint;
                    t.plugOptions.up = (pc.Vec3.equals( up, null )) ? pc.Vec3.UP.clone() : System.Nullable.getValue(up);
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics.DOLookAt:static end.*/

                /*DG.Tweening.DOTweenModulePhysics.DOJump:static start.*/
                /**
                 * Tweens a Rigidbody's position to the given value, while also applying a jump effect along the Y axis.
                 Returns a Sequence instead of a Tweener.
                 Also stores the Rigidbody as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics
                 * @memberof DG.Tweening.DOTweenModulePhysics
                 * @param   {UnityEngine.Rigidbody}    target       
                 * @param   {UnityEngine.Vector3}      endValue     The end value to reach
                 * @param   {number}                   jumpPower    Power of the jump (the max height of the jump is represented by this plus the final Y offset)
                 * @param   {number}                   numJumps     Total number of jumps
                 * @param   {number}                   duration     The duration of the tween
                 * @param   {boolean}                  snapping     If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Sequence}
                 */
                DOJump: function (target, endValue, jumpPower, numJumps, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    if (numJumps < 1) {
                        numJumps = 1;
                    }
                    var startPosY = 0;
                    var offsetY = -1;
                    var offsetYSet = false;
                    var s = DG.Tweening.DOTween.Sequence();
                    var yTween = DG.Tweening.TweenSettingsExtensions.OnStart(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetLoops$1(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetRelative(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$12(DG.Tweening.DOTween.To$12(function () {
                        return target.position;
                    }, Bridge.fn.cacheBind(target, target.MovePosition), new pc.Vec3( 0, jumpPower, 0 ), duration / (Bridge.Int.mul(numJumps, 2))), DG.Tweening.AxisConstraint.Y, snapping), DG.Tweening.Ease.OutQuad)), Bridge.Int.mul(numJumps, 2), DG.Tweening.LoopType.Yoyo), function () {
                        startPosY = target.position.y;
                    });
                    DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Sequence, DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Sequence, DG.Tweening.TweenSettingsExtensions.Join(DG.Tweening.TweenSettingsExtensions.Join(DG.Tweening.TweenSettingsExtensions.Append(s, DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$12(DG.Tweening.DOTween.To$12(function () {
                        return target.position;
                    }, Bridge.fn.cacheBind(target, target.MovePosition), new pc.Vec3( endValue.x, 0, 0 ), duration), DG.Tweening.AxisConstraint.X, snapping), DG.Tweening.Ease.Linear)), DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$12(DG.Tweening.DOTween.To$12(function () {
                        return target.position;
                    }, Bridge.fn.cacheBind(target, target.MovePosition), new pc.Vec3( 0, 0, endValue.z ), duration), DG.Tweening.AxisConstraint.Z, snapping), DG.Tweening.Ease.Linear)), yTween), target), DG.Tweening.DOTween.defaultEaseType);
                    DG.Tweening.TweenSettingsExtensions.OnUpdate(DG.Tweening.Tween, yTween, function () {
                        if (!offsetYSet) {
                            offsetYSet = true;
                            offsetY = s.isRelative ? endValue.y : endValue.y - startPosY;
                        }
                        var pos = target.position.$clone();
                        pos.y += DG.Tweening.DOVirtual.EasedValue(0, offsetY, DG.Tweening.TweenExtensions.ElapsedPercentage(yTween), DG.Tweening.Ease.OutQuad);
                        target.MovePosition(pos);
                    });
                    return s;
                },
                /*DG.Tweening.DOTweenModulePhysics.DOJump:static end.*/

                /*DG.Tweening.DOTweenModulePhysics.DOPath:static start.*/
                /**
                 * Tweens a Rigidbody's position through the given path waypoints, using the chosen path algorithm.
                 Also stores the Rigidbody as the tween's target so it can be used for filtered operations.
                 <p>NOTE: to tween a rigidbody correctly it should be set to kinematic at least while being tweened.</p><p>BEWARE: doesn't work on Windows Phone store (waiting for Unity to fix their own bug).
                 If you plan to publish there you should use a regular transform.DOPath.</p>
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics
                 * @memberof DG.Tweening.DOTweenModulePhysics
                 * @param   {UnityEngine.Rigidbody}             target        
                 * @param   {Array.<UnityEngine.Vector3>}       path          The waypoints to go through
                 * @param   {number}                            duration      The duration of the tween
                 * @param   {DG.Tweening.PathType}              pathType      The type of path: Linear (straight path), CatmullRom (curved CatmullRom path) or CubicBezier (curved with control points)
                 * @param   {DG.Tweening.PathMode}              pathMode      The path mode: 3D, side-scroller 2D, top-down 2D
                 * @param   {number}                            resolution    The resolution of the path (useless in case of Linear paths): higher resolutions make for more detailed curved paths but are more expensive.
                 Defaults to 10, but a value of 5 is usually enough if you don't have dramatic long curves between waypoints
                 * @param   {?UnityEngine.Color}                gizmoColor    The color of the path (shown when gizmos are active in the Play panel and the tween is running)
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOPath: function (target, path, duration, pathType, pathMode, resolution, gizmoColor) {
                    if (pathType === void 0) { pathType = 0; }
                    if (pathMode === void 0) { pathMode = 1; }
                    if (resolution === void 0) { resolution = 10; }
                    if (gizmoColor === void 0) { gizmoColor = null; }
                    if (resolution < 1) {
                        resolution = 1;
                    }
                    var t = DG.Tweening.TweenSettingsExtensions.SetUpdate$1(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions), DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions), DG.Tweening.DOTween.To(UnityEngine.Vector3, DG.Tweening.Plugins.Core.PathCore.Path, DG.Tweening.Plugins.Options.PathOptions, DG.Tweening.Plugins.PathPlugin.Get(), function () {
                        return target.position;
                    }, Bridge.fn.cacheBind(target, target.MovePosition), new DG.Tweening.Plugins.Core.PathCore.Path.$ctor1(pathType, path, resolution, System.Nullable.lift1("$clone", gizmoColor)), duration), target), DG.Tweening.UpdateType.Fixed);

                    t.plugOptions.isRigidbody = true;
                    t.plugOptions.mode = pathMode;
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics.DOPath:static end.*/

                /*DG.Tweening.DOTweenModulePhysics.DOPath$1:static start.*/
                DOPath$1: function (target, path, duration, pathMode) {
                    if (pathMode === void 0) { pathMode = 1; }
                    var t = DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions), DG.Tweening.DOTween.To(UnityEngine.Vector3, DG.Tweening.Plugins.Core.PathCore.Path, DG.Tweening.Plugins.Options.PathOptions, DG.Tweening.Plugins.PathPlugin.Get(), function () {
                        return target.position;
                    }, Bridge.fn.cacheBind(target, target.MovePosition), path, duration), target);

                    t.plugOptions.isRigidbody = true;
                    t.plugOptions.mode = pathMode;
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics.DOPath$1:static end.*/

                /*DG.Tweening.DOTweenModulePhysics.DOLocalPath:static start.*/
                /**
                 * Tweens a Rigidbody's localPosition through the given path waypoints, using the chosen path algorithm.
                 Also stores the Rigidbody as the tween's target so it can be used for filtered operations
                 <p>NOTE: to tween a rigidbody correctly it should be set to kinematic at least while being tweened.</p><p>BEWARE: doesn't work on Windows Phone store (waiting for Unity to fix their own bug).
                 If you plan to publish there you should use a regular transform.DOLocalPath.</p>
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics
                 * @memberof DG.Tweening.DOTweenModulePhysics
                 * @param   {UnityEngine.Rigidbody}             target        
                 * @param   {Array.<UnityEngine.Vector3>}       path          The waypoint to go through
                 * @param   {number}                            duration      The duration of the tween
                 * @param   {DG.Tweening.PathType}              pathType      The type of path: Linear (straight path), CatmullRom (curved CatmullRom path) or CubicBezier (curved with control points)
                 * @param   {DG.Tweening.PathMode}              pathMode      The path mode: 3D, side-scroller 2D, top-down 2D
                 * @param   {number}                            resolution    The resolution of the path: higher resolutions make for more detailed curved paths but are more expensive.
                 Defaults to 10, but a value of 5 is usually enough if you don't have dramatic long curves between waypoints
                 * @param   {?UnityEngine.Color}                gizmoColor    The color of the path (shown when gizmos are active in the Play panel and the tween is running)
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOLocalPath: function (target, path, duration, pathType, pathMode, resolution, gizmoColor) {
                    if (pathType === void 0) { pathType = 0; }
                    if (pathMode === void 0) { pathMode = 1; }
                    if (resolution === void 0) { resolution = 10; }
                    if (gizmoColor === void 0) { gizmoColor = null; }
                    if (resolution < 1) {
                        resolution = 1;
                    }
                    var trans = target.transform;
                    var t = DG.Tweening.TweenSettingsExtensions.SetUpdate$1(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions), DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions), DG.Tweening.DOTween.To(UnityEngine.Vector3, DG.Tweening.Plugins.Core.PathCore.Path, DG.Tweening.Plugins.Options.PathOptions, DG.Tweening.Plugins.PathPlugin.Get(), function () {
                        return trans.localPosition;
                    }, function (x) {
                        target.MovePosition(UnityEngine.Component.op_Equality(trans.parent, null) ? x.$clone() : trans.parent.TransformPoint$1(x));
                    }, new DG.Tweening.Plugins.Core.PathCore.Path.$ctor1(pathType, path, resolution, System.Nullable.lift1("$clone", gizmoColor)), duration), target), DG.Tweening.UpdateType.Fixed);

                    t.plugOptions.isRigidbody = true;
                    t.plugOptions.mode = pathMode;
                    t.plugOptions.useLocalPosition = true;
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics.DOLocalPath:static end.*/

                /*DG.Tweening.DOTweenModulePhysics.DOLocalPath$1:static start.*/
                DOLocalPath$1: function (target, path, duration, pathMode) {
                    if (pathMode === void 0) { pathMode = 1; }
                    var trans = target.transform;
                    var t = DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions), DG.Tweening.DOTween.To(UnityEngine.Vector3, DG.Tweening.Plugins.Core.PathCore.Path, DG.Tweening.Plugins.Options.PathOptions, DG.Tweening.Plugins.PathPlugin.Get(), function () {
                        return trans.localPosition;
                    }, function (x) {
                        target.MovePosition(UnityEngine.Component.op_Equality(trans.parent, null) ? x.$clone() : trans.parent.TransformPoint$1(x));
                    }, path, duration), target);

                    t.plugOptions.isRigidbody = true;
                    t.plugOptions.mode = pathMode;
                    t.plugOptions.useLocalPosition = true;
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics.DOLocalPath$1:static end.*/


            }
        }
    });
    /*DG.Tweening.DOTweenModulePhysics end.*/

    /*DG.Tweening.DOTweenModulePhysics2D start.*/
    Bridge.define("DG.Tweening.DOTweenModulePhysics2D", {
        statics: {
            methods: {
                /*DG.Tweening.DOTweenModulePhysics2D.DOMove:static start.*/
                /**
                 * Tweens a Rigidbody2D's position to the given value.
                 Also stores the Rigidbody2D as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics2D
                 * @memberof DG.Tweening.DOTweenModulePhysics2D
                 * @param   {UnityEngine.Rigidbody2D}           target      
                 * @param   {UnityEngine.Vector2}               endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOMove: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return target.position;
                    }, Bridge.fn.cacheBind(target, target.MovePosition), endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$9(t, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics2D.DOMove:static end.*/

                /*DG.Tweening.DOTweenModulePhysics2D.DOMoveX:static start.*/
                /**
                 * Tweens a Rigidbody2D's X position to the given value.
                 Also stores the Rigidbody2D as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics2D
                 * @memberof DG.Tweening.DOTweenModulePhysics2D
                 * @param   {UnityEngine.Rigidbody2D}           target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOMoveX: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return target.position;
                    }, Bridge.fn.cacheBind(target, target.MovePosition), new pc.Vec2( endValue, 0 ), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$8(t, DG.Tweening.AxisConstraint.X, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics2D.DOMoveX:static end.*/

                /*DG.Tweening.DOTweenModulePhysics2D.DOMoveY:static start.*/
                /**
                 * Tweens a Rigidbody2D's Y position to the given value.
                 Also stores the Rigidbody2D as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics2D
                 * @memberof DG.Tweening.DOTweenModulePhysics2D
                 * @param   {UnityEngine.Rigidbody2D}           target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOMoveY: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return target.position;
                    }, Bridge.fn.cacheBind(target, target.MovePosition), new pc.Vec2( 0, endValue ), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$8(t, DG.Tweening.AxisConstraint.Y, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics2D.DOMoveY:static end.*/

                /*DG.Tweening.DOTweenModulePhysics2D.DORotate:static start.*/
                /**
                 * Tweens a Rigidbody2D's rotation to the given value.
                 Also stores the Rigidbody2D as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics2D
                 * @memberof DG.Tweening.DOTweenModulePhysics2D
                 * @param   {UnityEngine.Rigidbody2D}           target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DORotate: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.To$4(function () {
                        return target.rotation;
                    }, Bridge.fn.cacheBind(target, target.MoveRotation), endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(System.Single,System.Single,DG.Tweening.Plugins.Options.FloatOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics2D.DORotate:static end.*/

                /*DG.Tweening.DOTweenModulePhysics2D.DOJump:static start.*/
                /**
                 * Tweens a Rigidbody2D's position to the given value, while also applying a jump effect along the Y axis.
                 Returns a Sequence instead of a Tweener.
                 Also stores the Rigidbody2D as the tween's target so it can be used for filtered operations.
                 <p>IMPORTANT: a rigidbody2D can't be animated in a jump arc using MovePosition, so the tween will directly set the position</p>
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics2D
                 * @memberof DG.Tweening.DOTweenModulePhysics2D
                 * @param   {UnityEngine.Rigidbody2D}    target       
                 * @param   {UnityEngine.Vector2}        endValue     The end value to reach
                 * @param   {number}                     jumpPower    Power of the jump (the max height of the jump is represented by this plus the final Y offset)
                 * @param   {number}                     numJumps     Total number of jumps
                 * @param   {number}                     duration     The duration of the tween
                 * @param   {boolean}                    snapping     If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Sequence}
                 */
                DOJump: function (target, endValue, jumpPower, numJumps, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    if (numJumps < 1) {
                        numJumps = 1;
                    }
                    var startPosY = 0;
                    var offsetY = -1;
                    var offsetYSet = false;
                    var s = DG.Tweening.DOTween.Sequence();
                    var yTween = DG.Tweening.TweenSettingsExtensions.OnStart(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetLoops$1(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetRelative(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$8(DG.Tweening.DOTween.To$11(function () {
                        return target.position;
                    }, function (x) {
                        target.position = x.$clone();
                    }, new pc.Vec2( 0, jumpPower ), duration / (Bridge.Int.mul(numJumps, 2))), DG.Tweening.AxisConstraint.Y, snapping), DG.Tweening.Ease.OutQuad)), Bridge.Int.mul(numJumps, 2), DG.Tweening.LoopType.Yoyo), function () {
                        startPosY = target.position.y;
                    });
                    DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Sequence, DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Sequence, DG.Tweening.TweenSettingsExtensions.Join(DG.Tweening.TweenSettingsExtensions.Append(s, DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$8(DG.Tweening.DOTween.To$11(function () {
                        return target.position;
                    }, function (x) {
                        target.position = x.$clone();
                    }, new pc.Vec2( endValue.x, 0 ), duration), DG.Tweening.AxisConstraint.X, snapping), DG.Tweening.Ease.Linear)), yTween), target), DG.Tweening.DOTween.defaultEaseType);
                    DG.Tweening.TweenSettingsExtensions.OnUpdate(DG.Tweening.Tween, yTween, function () {
                        if (!offsetYSet) {
                            offsetYSet = true;
                            offsetY = s.isRelative ? endValue.y : endValue.y - startPosY;
                        }
                        var pos = UnityEngine.Vector3.FromVector2(target.position.$clone());
                        pos.y += DG.Tweening.DOVirtual.EasedValue(0, offsetY, DG.Tweening.TweenExtensions.ElapsedPercentage(yTween), DG.Tweening.Ease.OutQuad);
                        target.MovePosition$1(pos.$clone());
                    });
                    return s;
                },
                /*DG.Tweening.DOTweenModulePhysics2D.DOJump:static end.*/

                /*DG.Tweening.DOTweenModulePhysics2D.DOPath:static start.*/
                /**
                 * Tweens a Rigidbody2D's position through the given path waypoints, using the chosen path algorithm.
                 Also stores the Rigidbody2D as the tween's target so it can be used for filtered operations.
                 <p>NOTE: to tween a Rigidbody2D correctly it should be set to kinematic at least while being tweened.</p><p>BEWARE: doesn't work on Windows Phone store (waiting for Unity to fix their own bug).
                 If you plan to publish there you should use a regular transform.DOPath.</p>
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics2D
                 * @memberof DG.Tweening.DOTweenModulePhysics2D
                 * @param   {UnityEngine.Rigidbody2D}           target        
                 * @param   {Array.<UnityEngine.Vector2>}       path          The waypoints to go through
                 * @param   {number}                            duration      The duration of the tween
                 * @param   {DG.Tweening.PathType}              pathType      The type of path: Linear (straight path), CatmullRom (curved CatmullRom path) or CubicBezier (curved with control points)
                 * @param   {DG.Tweening.PathMode}              pathMode      The path mode: 3D, side-scroller 2D, top-down 2D
                 * @param   {number}                            resolution    The resolution of the path (useless in case of Linear paths): higher resolutions make for more detailed curved paths but are more expensive.
                 Defaults to 10, but a value of 5 is usually enough if you don't have dramatic long curves between waypoints
                 * @param   {?UnityEngine.Color}                gizmoColor    The color of the path (shown when gizmos are active in the Play panel and the tween is running)
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOPath: function (target, path, duration, pathType, pathMode, resolution, gizmoColor) {
                    if (pathType === void 0) { pathType = 0; }
                    if (pathMode === void 0) { pathMode = 1; }
                    if (resolution === void 0) { resolution = 10; }
                    if (gizmoColor === void 0) { gizmoColor = null; }
                    if (resolution < 1) {
                        resolution = 1;
                    }
                    var len = path.length;
                    var path3D = System.Array.init(len, function (){
                        return new UnityEngine.Vector3();
                    }, UnityEngine.Vector3);
                    for (var i = 0; i < len; i = (i + 1) | 0) {
                        path3D[i] = UnityEngine.Vector3.FromVector2(path[i].$clone());
                    }
                    var t = DG.Tweening.TweenSettingsExtensions.SetUpdate$1(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions), DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions), DG.Tweening.DOTween.To(UnityEngine.Vector3, DG.Tweening.Plugins.Core.PathCore.Path, DG.Tweening.Plugins.Options.PathOptions, DG.Tweening.Plugins.PathPlugin.Get(), function () {
                        return UnityEngine.Vector3.FromVector2(target.position);
                    }, function (x) {
                        target.MovePosition$1(x.$clone());
                    }, new DG.Tweening.Plugins.Core.PathCore.Path.$ctor1(pathType, path3D, resolution, System.Nullable.lift1("$clone", gizmoColor)), duration), target), DG.Tweening.UpdateType.Fixed);

                    t.plugOptions.isRigidbody = true;
                    t.plugOptions.mode = pathMode;
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics2D.DOPath:static end.*/

                /*DG.Tweening.DOTweenModulePhysics2D.DOLocalPath:static start.*/
                /**
                 * Tweens a Rigidbody2D's localPosition through the given path waypoints, using the chosen path algorithm.
                 Also stores the Rigidbody2D as the tween's target so it can be used for filtered operations
                 <p>NOTE: to tween a Rigidbody2D correctly it should be set to kinematic at least while being tweened.</p><p>BEWARE: doesn't work on Windows Phone store (waiting for Unity to fix their own bug).
                 If you plan to publish there you should use a regular transform.DOLocalPath.</p>
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModulePhysics2D
                 * @memberof DG.Tweening.DOTweenModulePhysics2D
                 * @param   {UnityEngine.Rigidbody2D}           target        
                 * @param   {Array.<UnityEngine.Vector2>}       path          The waypoint to go through
                 * @param   {number}                            duration      The duration of the tween
                 * @param   {DG.Tweening.PathType}              pathType      The type of path: Linear (straight path), CatmullRom (curved CatmullRom path) or CubicBezier (curved with control points)
                 * @param   {DG.Tweening.PathMode}              pathMode      The path mode: 3D, side-scroller 2D, top-down 2D
                 * @param   {number}                            resolution    The resolution of the path: higher resolutions make for more detailed curved paths but are more expensive.
                 Defaults to 10, but a value of 5 is usually enough if you don't have dramatic long curves between waypoints
                 * @param   {?UnityEngine.Color}                gizmoColor    The color of the path (shown when gizmos are active in the Play panel and the tween is running)
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOLocalPath: function (target, path, duration, pathType, pathMode, resolution, gizmoColor) {
                    if (pathType === void 0) { pathType = 0; }
                    if (pathMode === void 0) { pathMode = 1; }
                    if (resolution === void 0) { resolution = 10; }
                    if (gizmoColor === void 0) { gizmoColor = null; }
                    if (resolution < 1) {
                        resolution = 1;
                    }
                    var len = path.length;
                    var path3D = System.Array.init(len, function (){
                        return new UnityEngine.Vector3();
                    }, UnityEngine.Vector3);
                    for (var i = 0; i < len; i = (i + 1) | 0) {
                        path3D[i] = UnityEngine.Vector3.FromVector2(path[i].$clone());
                    }
                    var trans = target.transform;
                    var t = DG.Tweening.TweenSettingsExtensions.SetUpdate$1(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions), DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions), DG.Tweening.DOTween.To(UnityEngine.Vector3, DG.Tweening.Plugins.Core.PathCore.Path, DG.Tweening.Plugins.Options.PathOptions, DG.Tweening.Plugins.PathPlugin.Get(), function () {
                        return trans.localPosition;
                    }, function (x) {
                        target.MovePosition$1(UnityEngine.Component.op_Equality(trans.parent, null) ? x.$clone() : trans.parent.TransformPoint$1(x));
                    }, new DG.Tweening.Plugins.Core.PathCore.Path.$ctor1(pathType, path3D, resolution, System.Nullable.lift1("$clone", gizmoColor)), duration), target), DG.Tweening.UpdateType.Fixed);

                    t.plugOptions.isRigidbody = true;
                    t.plugOptions.mode = pathMode;
                    t.plugOptions.useLocalPosition = true;
                    return t;
                },
                /*DG.Tweening.DOTweenModulePhysics2D.DOLocalPath:static end.*/


            }
        }
    });
    /*DG.Tweening.DOTweenModulePhysics2D end.*/

    /*DG.Tweening.DOTweenModuleSprite start.*/
    Bridge.define("DG.Tweening.DOTweenModuleSprite", {
        statics: {
            methods: {
                /*DG.Tweening.DOTweenModuleSprite.DOColor:static start.*/
                /**
                 * Tweens a SpriteRenderer's color to the given value.
                 Also stores the spriteRenderer as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleSprite
                 * @memberof DG.Tweening.DOTweenModuleSprite
                 * @param   {UnityEngine.SpriteRenderer}        target      
                 * @param   {UnityEngine.Color}                 endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOColor: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.To$8(function () {
                        return target.color;
                    }, function (x) {
                        target.color = x.$clone();
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleSprite.DOColor:static end.*/

                /*DG.Tweening.DOTweenModuleSprite.DOFade:static start.*/
                /**
                 * Tweens a Material's alpha color to the given value.
                 Also stores the spriteRenderer as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleSprite
                 * @memberof DG.Tweening.DOTweenModuleSprite
                 * @param   {UnityEngine.SpriteRenderer}        target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOFade: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.ToAlpha(function () {
                        return target.color;
                    }, function (x) {
                        target.color = x.$clone();
                    }, endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleSprite.DOFade:static end.*/

                /*DG.Tweening.DOTweenModuleSprite.DOGradientColor:static start.*/
                /**
                 * Tweens a SpriteRenderer's color using the given gradient
                 (NOTE 1: only uses the colors of the gradient, not the alphas - NOTE 2: creates a Sequence, not a Tweener).
                 Also stores the image as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleSprite
                 * @memberof DG.Tweening.DOTweenModuleSprite
                 * @param   {UnityEngine.SpriteRenderer}    target      
                 * @param   {UnityEngine.Gradient}          gradient    The gradient to use
                 * @param   {number}                        duration    The duration of the tween
                 * @return  {DG.Tweening.Sequence}
                 */
                DOGradientColor: function (target, gradient, duration) {
                    var s = DG.Tweening.DOTween.Sequence();
                    var colors = gradient.colorKeys;
                    var len = colors.length;
                    for (var i = 0; i < len; i = (i + 1) | 0) {
                        var c = colors[i];
                        if (i === 0 && c.time <= 0) {
                            target.color = c.color.$clone();
                            continue;
                        }
                        var colorDuration = i === ((len - 1) | 0) ? duration - DG.Tweening.TweenExtensions.Duration(s, false) : duration * (i === 0 ? c.time : c.time - colors[((i - 1) | 0)].time);
                        DG.Tweening.TweenSettingsExtensions.Append(s, DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), DG.Tweening.DOTweenModuleSprite.DOColor(target, c.color.$clone(), colorDuration), DG.Tweening.Ease.Linear));
                    }
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Sequence, s, target);
                    return s;
                },
                /*DG.Tweening.DOTweenModuleSprite.DOGradientColor:static end.*/

                /*DG.Tweening.DOTweenModuleSprite.DOBlendableColor:static start.*/
                /**
                 * Tweens a SpriteRenderer's color to the given value,
                 in a way that allows other DOBlendableColor tweens to work together on the same target,
                 instead than fight each other as multiple DOColor would do.
                 Also stores the SpriteRenderer as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleSprite
                 * @memberof DG.Tweening.DOTweenModuleSprite
                 * @param   {UnityEngine.SpriteRenderer}    target      
                 * @param   {UnityEngine.Color}             endValue    The value to tween to
                 * @param   {number}                        duration    The duration of the tween
                 * @return  {DG.Tweening.Tweener}
                 */
                DOBlendableColor: function (target, endValue, duration) {
                    var $t;
                    endValue = ($t = target.color, new pc.Color( endValue.r - $t.r, endValue.g - $t.g, endValue.b - $t.b, endValue.a - $t.a ));
                    var to = new pc.Color( 0, 0, 0, 0 );
                    return DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), DG.Tweening.Core.Extensions.Blendable(UnityEngine.Color, UnityEngine.Color, DG.Tweening.Plugins.Options.ColorOptions, DG.Tweening.DOTween.To$8(function () {
                        return to;
                    }, function (x) {
                        var $t1;
                        var diff = new pc.Color( x.r - to.r, x.g - to.g, x.b - to.b, x.a - to.a );
                        to = x.$clone();
                        target.color = ($t1 = target.color.$clone(), new pc.Color( $t1.r + diff.$clone().r, $t1.g + diff.$clone().g, $t1.b + diff.$clone().b, $t1.a + diff.$clone().a ));
                    }, endValue.$clone(), duration)), target);
                },
                /*DG.Tweening.DOTweenModuleSprite.DOBlendableColor:static end.*/


            }
        }
    });
    /*DG.Tweening.DOTweenModuleSprite end.*/

    /*DG.Tweening.DOTweenModuleUI start.*/
    Bridge.define("DG.Tweening.DOTweenModuleUI", {
        statics: {
            methods: {
                /*DG.Tweening.DOTweenModuleUI.DOFade:static start.*/
                /**
                 * Tweens a CanvasGroup's alpha color to the given value.
                 Also stores the canvasGroup as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.CanvasGroup}           target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOFade: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.To$4(function () {
                        return target.alpha;
                    }, function (x) {
                        target.alpha = x;
                    }, endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(System.Single,System.Single,DG.Tweening.Plugins.Options.FloatOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOFade:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOFade$1:static start.*/
                /**
                 * Tweens an Graphic's alpha color to the given value.
                 Also stores the image as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Graphic}            target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOFade$1: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.ToAlpha(function () {
                        return target.color;
                    }, function (x) {
                        target.color = x.$clone();
                    }, endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOFade$1:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOFade$2:static start.*/
                /**
                 * Tweens an Image's alpha color to the given value.
                 Also stores the image as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Image}              target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOFade$2: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.ToAlpha(function () {
                        return target.color;
                    }, function (x) {
                        target.color = x.$clone();
                    }, endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOFade$2:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOFade$3:static start.*/
                /**
                 * Tweens a Outline's effectColor alpha to the given value.
                 Also stores the Outline as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Outline}            target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOFade$3: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.ToAlpha(function () {
                        return target.effectColor;
                    }, function (x) {
                        target.effectColor = x.$clone();
                    }, endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOFade$3:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOFade$4:static start.*/
                /**
                 * Tweens a Text's alpha color to the given value.
                 Also stores the Text as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Text}               target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOFade$4: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.ToAlpha(function () {
                        return target.color;
                    }, function (x) {
                        target.color = x.$clone();
                    }, endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOFade$4:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOColor:static start.*/
                /**
                 * Tweens an Graphic's color to the given value.
                 Also stores the image as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Graphic}            target      
                 * @param   {UnityEngine.Color}                 endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOColor: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.To$8(function () {
                        return target.color;
                    }, function (x) {
                        target.color = x.$clone();
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOColor:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOColor$1:static start.*/
                /**
                 * Tweens an Image's color to the given value.
                 Also stores the image as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Image}              target      
                 * @param   {UnityEngine.Color}                 endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOColor$1: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.To$8(function () {
                        return target.color;
                    }, function (x) {
                        target.color = x.$clone();
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOColor$1:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOColor$2:static start.*/
                /**
                 * Tweens a Outline's effectColor to the given value.
                 Also stores the Outline as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Outline}            target      
                 * @param   {UnityEngine.Color}                 endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOColor$2: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.To$8(function () {
                        return target.effectColor;
                    }, function (x) {
                        target.effectColor = x.$clone();
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOColor$2:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOColor$3:static start.*/
                /**
                 * Tweens a Text's color to the given value.
                 Also stores the Text as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Text}               target      
                 * @param   {UnityEngine.Color}                 endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOColor$3: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.To$8(function () {
                        return target.color;
                    }, function (x) {
                        target.color = x.$clone();
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOColor$3:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOFillAmount:static start.*/
                /**
                 * Tweens an Image's fillAmount to the given value.
                 Also stores the image as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Image}              target      
                 * @param   {number}                            endValue    The end value to reach (0 to 1)
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOFillAmount: function (target, endValue, duration) {
                    if (endValue > 1) {
                        endValue = 1;
                    } else {
                        if (endValue < 0) {
                            endValue = 0;
                        }
                    }
                    var t = DG.Tweening.DOTween.To$4(function () {
                        return target.fillAmount;
                    }, function (x) {
                        target.fillAmount = x;
                    }, endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(System.Single,System.Single,DG.Tweening.Plugins.Options.FloatOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOFillAmount:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOGradientColor:static start.*/
                /**
                 * Tweens an Image's colors using the given gradient
                 (NOTE 1: only uses the colors of the gradient, not the alphas - NOTE 2: creates a Sequence, not a Tweener).
                 Also stores the image as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Image}    target      
                 * @param   {UnityEngine.Gradient}    gradient    The gradient to use
                 * @param   {number}                  duration    The duration of the tween
                 * @return  {DG.Tweening.Sequence}
                 */
                DOGradientColor: function (target, gradient, duration) {
                    var s = DG.Tweening.DOTween.Sequence();
                    var colors = gradient.colorKeys;
                    var len = colors.length;
                    for (var i = 0; i < len; i = (i + 1) | 0) {
                        var c = colors[i];
                        if (i === 0 && c.time <= 0) {
                            target.color = c.color.$clone();
                            continue;
                        }
                        var colorDuration = i === ((len - 1) | 0) ? duration - DG.Tweening.TweenExtensions.Duration(s, false) : duration * (i === 0 ? c.time : c.time - colors[((i - 1) | 0)].time);
                        DG.Tweening.TweenSettingsExtensions.Append(s, DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), DG.Tweening.DOTweenModuleUI.DOColor$1(target, c.color.$clone(), colorDuration), DG.Tweening.Ease.Linear));
                    }
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Sequence, s, target);
                    return s;
                },
                /*DG.Tweening.DOTweenModuleUI.DOGradientColor:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOFlexibleSize:static start.*/
                /**
                 * Tweens an LayoutElement's flexibleWidth/Height to the given value.
                 Also stores the LayoutElement as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.LayoutElement}      target      
                 * @param   {UnityEngine.Vector2}               endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOFlexibleSize: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return new pc.Vec2( target.flexibleWidth, target.flexibleHeight );
                    }, function (x) {
                        target.flexibleWidth = x.x;
                        target.flexibleHeight = x.y;
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$9(t, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOFlexibleSize:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOMinSize:static start.*/
                /**
                 * Tweens an LayoutElement's minWidth/Height to the given value.
                 Also stores the LayoutElement as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.LayoutElement}      target      
                 * @param   {UnityEngine.Vector2}               endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOMinSize: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return new pc.Vec2( target.minWidth, target.minHeight );
                    }, function (x) {
                        target.minWidth = x.x;
                        target.minHeight = x.y;
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$9(t, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOMinSize:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOPreferredSize:static start.*/
                /**
                 * Tweens an LayoutElement's preferredWidth/Height to the given value.
                 Also stores the LayoutElement as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.LayoutElement}      target      
                 * @param   {UnityEngine.Vector2}               endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOPreferredSize: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return new pc.Vec2( target.preferredWidth, target.preferredHeight );
                    }, function (x) {
                        target.preferredWidth = x.x;
                        target.preferredHeight = x.y;
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$9(t, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOPreferredSize:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOScale:static start.*/
                /**
                 * Tweens a Outline's effectDistance to the given value.
                 Also stores the Outline as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Outline}            target      
                 * @param   {UnityEngine.Vector2}               endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOScale: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return target.effectDistance;
                    }, function (x) {
                        target.effectDistance = x.$clone();
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOScale:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOAnchorPos:static start.*/
                /**
                 * Tweens a RectTransform's anchoredPosition to the given value.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}         target      
                 * @param   {UnityEngine.Vector2}               endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOAnchorPos: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return target.anchoredPosition;
                    }, function (x) {
                        target.anchoredPosition = x.$clone();
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$9(t, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOAnchorPos:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOAnchorPosX:static start.*/
                /**
                 * Tweens a RectTransform's anchoredPosition X to the given value.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}         target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOAnchorPosX: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return target.anchoredPosition;
                    }, function (x) {
                        target.anchoredPosition = x.$clone();
                    }, new pc.Vec2( endValue, 0 ), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$8(t, DG.Tweening.AxisConstraint.X, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOAnchorPosX:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOAnchorPosY:static start.*/
                /**
                 * Tweens a RectTransform's anchoredPosition Y to the given value.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}         target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOAnchorPosY: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return target.anchoredPosition;
                    }, function (x) {
                        target.anchoredPosition = x.$clone();
                    }, new pc.Vec2( 0, endValue ), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$8(t, DG.Tweening.AxisConstraint.Y, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOAnchorPosY:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOAnchorPos3D:static start.*/
                /**
                 * Tweens a RectTransform's anchoredPosition3D to the given value.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}         target      
                 * @param   {UnityEngine.Vector3}               endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOAnchorPos3D: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$12(function () {
                        return target.anchoredPosition3D;
                    }, function (x) {
                        target.anchoredPosition3D = x.$clone();
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$13(t, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOAnchorPos3D:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOAnchorPos3DX:static start.*/
                /**
                 * Tweens a RectTransform's anchoredPosition3D X to the given value.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}         target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOAnchorPos3DX: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$12(function () {
                        return target.anchoredPosition3D;
                    }, function (x) {
                        target.anchoredPosition3D = x.$clone();
                    }, new pc.Vec3( endValue, 0, 0 ), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$12(t, DG.Tweening.AxisConstraint.X, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOAnchorPos3DX:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOAnchorPos3DY:static start.*/
                /**
                 * Tweens a RectTransform's anchoredPosition3D Y to the given value.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}         target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOAnchorPos3DY: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$12(function () {
                        return target.anchoredPosition3D;
                    }, function (x) {
                        target.anchoredPosition3D = x.$clone();
                    }, new pc.Vec3( 0, endValue, 0 ), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$12(t, DG.Tweening.AxisConstraint.Y, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOAnchorPos3DY:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOAnchorPos3DZ:static start.*/
                /**
                 * Tweens a RectTransform's anchoredPosition3D Z to the given value.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}         target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOAnchorPos3DZ: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$12(function () {
                        return target.anchoredPosition3D;
                    }, function (x) {
                        target.anchoredPosition3D = x.$clone();
                    }, new pc.Vec3( 0, 0, endValue ), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$12(t, DG.Tweening.AxisConstraint.Z, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOAnchorPos3DZ:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOAnchorMax:static start.*/
                /**
                 * Tweens a RectTransform's anchorMax to the given value.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}         target      
                 * @param   {UnityEngine.Vector2}               endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOAnchorMax: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return target.anchorMax;
                    }, function (x) {
                        target.anchorMax = x.$clone();
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$9(t, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOAnchorMax:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOAnchorMin:static start.*/
                /**
                 * Tweens a RectTransform's anchorMin to the given value.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}         target      
                 * @param   {UnityEngine.Vector2}               endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOAnchorMin: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return target.anchorMin;
                    }, function (x) {
                        target.anchorMin = x.$clone();
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$9(t, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOAnchorMin:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOPivot:static start.*/
                /**
                 * Tweens a RectTransform's pivot to the given value.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}         target      
                 * @param   {UnityEngine.Vector2}               endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOPivot: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return target.pivot;
                    }, function (x) {
                        target.pivot = x.$clone();
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOPivot:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOPivotX:static start.*/
                /**
                 * Tweens a RectTransform's pivot X to the given value.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}         target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOPivotX: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return target.pivot;
                    }, function (x) {
                        target.pivot = x.$clone();
                    }, new pc.Vec2( endValue, 0 ), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$8(t, DG.Tweening.AxisConstraint.X), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOPivotX:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOPivotY:static start.*/
                /**
                 * Tweens a RectTransform's pivot Y to the given value.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}         target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOPivotY: function (target, endValue, duration) {
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return target.pivot;
                    }, function (x) {
                        target.pivot = x.$clone();
                    }, new pc.Vec2( 0, endValue ), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$8(t, DG.Tweening.AxisConstraint.Y), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOPivotY:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOSizeDelta:static start.*/
                /**
                 * Tweens a RectTransform's sizeDelta to the given value.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}         target      
                 * @param   {UnityEngine.Vector2}               endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOSizeDelta: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$11(function () {
                        return target.sizeDelta;
                    }, function (x) {
                        target.sizeDelta = x.$clone();
                    }, endValue.$clone(), duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$9(t, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOSizeDelta:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOPunchAnchorPos:static start.*/
                /**
                 * Punches a RectTransform's anchoredPosition towards the given direction and then back to the starting one
                 as if it was connected to the starting position via an elastic.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}    target        
                 * @param   {UnityEngine.Vector2}          punch         The direction and strength of the punch (added to the RectTransform's current position)
                 * @param   {number}                       duration      The duration of the tween
                 * @param   {number}                       vibrato       Indicates how much will the punch vibrate
                 * @param   {number}                       elasticity    Represents how much (0 to 1) the vector will go beyond the starting position when bouncing backwards.
                 1 creates a full oscillation between the punch direction and the opposite direction,
                 while 0 oscillates only between the punch and the start position
                 * @param   {boolean}                      snapping      If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Tweener}
                 */
                DOPunchAnchorPos: function (target, punch, duration, vibrato, elasticity, snapping) {
                    if (vibrato === void 0) { vibrato = 10; }
                    if (elasticity === void 0) { elasticity = 1.0; }
                    if (snapping === void 0) { snapping = false; }
                    return DG.Tweening.TweenSettingsExtensions.SetOptions$11(DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,System.Array.type(UnityEngine.Vector3),DG.Tweening.Plugins.Options.Vector3ArrayOptions), DG.Tweening.DOTween.Punch(function () {
                        return UnityEngine.Vector3.FromVector2(target.anchoredPosition);
                    }, function (x) {
                        target.anchoredPosition = UnityEngine.Vector2.FromVector3(x.$clone());
                    }, UnityEngine.Vector3.FromVector2(punch.$clone()), duration, vibrato, elasticity), target), snapping);
                },
                /*DG.Tweening.DOTweenModuleUI.DOPunchAnchorPos:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOShakeAnchorPos:static start.*/
                /**
                 * Shakes a RectTransform's anchoredPosition with the given values.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}    target        
                 * @param   {number}                       duration      The duration of the tween
                 * @param   {number}                       strength      The shake strength
                 * @param   {number}                       vibrato       Indicates how much will the shake vibrate
                 * @param   {number}                       randomness    Indicates how much the shake will be random (0 to 180 - values higher than 90 kind of suck, so beware). 
                 Setting it to 0 will shake along a single direction.
                 * @param   {boolean}                      snapping      If TRUE the tween will smoothly snap all values to integers
                 * @param   {boolean}                      fadeOut       If TRUE the shake will automatically fadeOut smoothly within the tween's duration, otherwise it will not
                 * @return  {DG.Tweening.Tweener}
                 */
                DOShakeAnchorPos: function (target, duration, strength, vibrato, randomness, snapping, fadeOut) {
                    if (strength === void 0) { strength = 100.0; }
                    if (vibrato === void 0) { vibrato = 10; }
                    if (randomness === void 0) { randomness = 90.0; }
                    if (snapping === void 0) { snapping = false; }
                    if (fadeOut === void 0) { fadeOut = true; }
                    return DG.Tweening.TweenSettingsExtensions.SetOptions$11(DG.Tweening.Core.Extensions.SetSpecialStartupMode(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,System.Array.type(UnityEngine.Vector3),DG.Tweening.Plugins.Options.Vector3ArrayOptions), DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,System.Array.type(UnityEngine.Vector3),DG.Tweening.Plugins.Options.Vector3ArrayOptions), DG.Tweening.DOTween.Shake(function () {
                        return UnityEngine.Vector3.FromVector2(target.anchoredPosition);
                    }, function (x) {
                        target.anchoredPosition = UnityEngine.Vector2.FromVector3(x.$clone());
                    }, duration, strength, vibrato, randomness, true, fadeOut), target), DG.Tweening.Core.Enums.SpecialStartupMode.SetShake), snapping);
                },
                /*DG.Tweening.DOTweenModuleUI.DOShakeAnchorPos:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOShakeAnchorPos$1:static start.*/
                /**
                 * Shakes a RectTransform's anchoredPosition with the given values.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}    target        
                 * @param   {number}                       duration      The duration of the tween
                 * @param   {UnityEngine.Vector2}          strength      The shake strength on each axis
                 * @param   {number}                       vibrato       Indicates how much will the shake vibrate
                 * @param   {number}                       randomness    Indicates how much the shake will be random (0 to 180 - values higher than 90 kind of suck, so beware). 
                 Setting it to 0 will shake along a single direction.
                 * @param   {boolean}                      snapping      If TRUE the tween will smoothly snap all values to integers
                 * @param   {boolean}                      fadeOut       If TRUE the shake will automatically fadeOut smoothly within the tween's duration, otherwise it will not
                 * @return  {DG.Tweening.Tweener}
                 */
                DOShakeAnchorPos$1: function (target, duration, strength, vibrato, randomness, snapping, fadeOut) {
                    if (vibrato === void 0) { vibrato = 10; }
                    if (randomness === void 0) { randomness = 90.0; }
                    if (snapping === void 0) { snapping = false; }
                    if (fadeOut === void 0) { fadeOut = true; }
                    return DG.Tweening.TweenSettingsExtensions.SetOptions$11(DG.Tweening.Core.Extensions.SetSpecialStartupMode(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,System.Array.type(UnityEngine.Vector3),DG.Tweening.Plugins.Options.Vector3ArrayOptions), DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,System.Array.type(UnityEngine.Vector3),DG.Tweening.Plugins.Options.Vector3ArrayOptions), DG.Tweening.DOTween.Shake$1(function () {
                        return UnityEngine.Vector3.FromVector2(target.anchoredPosition);
                    }, function (x) {
                        target.anchoredPosition = UnityEngine.Vector2.FromVector3(x.$clone());
                    }, duration, UnityEngine.Vector3.FromVector2(strength.$clone()), vibrato, randomness, fadeOut), target), DG.Tweening.Core.Enums.SpecialStartupMode.SetShake), snapping);
                },
                /*DG.Tweening.DOTweenModuleUI.DOShakeAnchorPos$1:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOJumpAnchorPos:static start.*/
                /**
                 * Tweens a RectTransform's anchoredPosition to the given value, while also applying a jump effect along the Y axis.
                 Returns a Sequence instead of a Tweener.
                 Also stores the RectTransform as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.RectTransform}    target       
                 * @param   {UnityEngine.Vector2}          endValue     The end value to reach
                 * @param   {number}                       jumpPower    Power of the jump (the max height of the jump is represented by this plus the final Y offset)
                 * @param   {number}                       numJumps     Total number of jumps
                 * @param   {number}                       duration     The duration of the tween
                 * @param   {boolean}                      snapping     If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Sequence}
                 */
                DOJumpAnchorPos: function (target, endValue, jumpPower, numJumps, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    if (numJumps < 1) {
                        numJumps = 1;
                    }
                    var startPosY = 0;
                    var offsetY = -1;
                    var offsetYSet = false;

                    // Separate Y Tween so we can elaborate elapsedPercentage on that insted of on the Sequence
                    // (in case users add a delay or other elements to the Sequence)
                    var s = DG.Tweening.DOTween.Sequence();
                    var yTween = DG.Tweening.TweenSettingsExtensions.OnStart(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetLoops$1(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetRelative(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$8(DG.Tweening.DOTween.To$11(function () {
                        return target.anchoredPosition;
                    }, function (x) {
                        target.anchoredPosition = x.$clone();
                    }, new pc.Vec2( 0, jumpPower ), duration / (Bridge.Int.mul(numJumps, 2))), DG.Tweening.AxisConstraint.Y, snapping), DG.Tweening.Ease.OutQuad)), Bridge.Int.mul(numJumps, 2), DG.Tweening.LoopType.Yoyo), function () {
                        startPosY = target.anchoredPosition.y;
                    });
                    DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Sequence, DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Sequence, DG.Tweening.TweenSettingsExtensions.Join(DG.Tweening.TweenSettingsExtensions.Append(s, DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$8(DG.Tweening.DOTween.To$11(function () {
                        return target.anchoredPosition;
                    }, function (x) {
                        target.anchoredPosition = x.$clone();
                    }, new pc.Vec2( endValue.x, 0 ), duration), DG.Tweening.AxisConstraint.X, snapping), DG.Tweening.Ease.Linear)), yTween), target), DG.Tweening.DOTween.defaultEaseType);
                    DG.Tweening.TweenSettingsExtensions.OnUpdate(DG.Tweening.Sequence, s, function () {
                        if (!offsetYSet) {
                            offsetYSet = true;
                            offsetY = s.isRelative ? endValue.y : endValue.y - startPosY;
                        }
                        var pos = target.anchoredPosition.$clone();
                        pos.y += DG.Tweening.DOVirtual.EasedValue(0, offsetY, DG.Tweening.TweenExtensions.ElapsedDirectionalPercentage(s), DG.Tweening.Ease.OutQuad);
                        target.anchoredPosition = pos.$clone();
                    });
                    return s;
                },
                /*DG.Tweening.DOTweenModuleUI.DOJumpAnchorPos:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DONormalizedPos:static start.*/
                /**
                 * Tweens a ScrollRect's horizontal/verticalNormalizedPosition to the given value.
                 Also stores the ScrollRect as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.ScrollRect}    target      
                 * @param   {UnityEngine.Vector2}          endValue    The end value to reach
                 * @param   {number}                       duration    The duration of the tween
                 * @param   {boolean}                      snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Tweener}
                 */
                DONormalizedPos: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    return DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$9(DG.Tweening.DOTween.To$11(function () {
                        return new pc.Vec2( target.horizontalNormalizedPosition, target.verticalNormalizedPosition );
                    }, function (x) {
                        target.horizontalNormalizedPosition = x.x;
                        target.verticalNormalizedPosition = x.y;
                    }, endValue.$clone(), duration), snapping), target);
                },
                /*DG.Tweening.DOTweenModuleUI.DONormalizedPos:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOHorizontalNormalizedPos:static start.*/
                /**
                 * Tweens a ScrollRect's horizontalNormalizedPosition to the given value.
                 Also stores the ScrollRect as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.ScrollRect}    target      
                 * @param   {number}                       endValue    The end value to reach
                 * @param   {number}                       duration    The duration of the tween
                 * @param   {boolean}                      snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Tweener}
                 */
                DOHorizontalNormalizedPos: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    return DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$2(DG.Tweening.DOTween.To$4(function () {
                        return target.horizontalNormalizedPosition;
                    }, function (x) {
                        target.horizontalNormalizedPosition = x;
                    }, endValue, duration), snapping), target);
                },
                /*DG.Tweening.DOTweenModuleUI.DOHorizontalNormalizedPos:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOVerticalNormalizedPos:static start.*/
                /**
                 * Tweens a ScrollRect's verticalNormalizedPosition to the given value.
                 Also stores the ScrollRect as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.ScrollRect}    target      
                 * @param   {number}                       endValue    The end value to reach
                 * @param   {number}                       duration    The duration of the tween
                 * @param   {boolean}                      snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Tweener}
                 */
                DOVerticalNormalizedPos: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    return DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$2(DG.Tweening.DOTween.To$4(function () {
                        return target.verticalNormalizedPosition;
                    }, function (x) {
                        target.verticalNormalizedPosition = x;
                    }, endValue, duration), snapping), target);
                },
                /*DG.Tweening.DOTweenModuleUI.DOVerticalNormalizedPos:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOValue:static start.*/
                /**
                 * Tweens a Slider's value to the given value.
                 Also stores the Slider as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Slider}             target      
                 * @param   {number}                            endValue    The end value to reach
                 * @param   {number}                            duration    The duration of the tween
                 * @param   {boolean}                           snapping    If TRUE the tween will smoothly snap all values to integers
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOValue: function (target, endValue, duration, snapping) {
                    if (snapping === void 0) { snapping = false; }
                    var t = DG.Tweening.DOTween.To$4(function () {
                        return target.value;
                    }, function (x) {
                        target.value = x;
                    }, endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$2(t, snapping), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOValue:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOCounter:static start.*/
                /**
                 * Tweens a Text's text from one integer to another, with options for thousands separators
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Text}                 target                   
                 * @param   {number}                              fromValue                The value to start from
                 * @param   {number}                              endValue                 The end value to reach
                 * @param   {number}                              duration                 The duration of the tween
                 * @param   {boolean}                             addThousandsSeparator    If TRUE (default) also adds thousands separators
                 * @param   {System.Globalization.CultureInfo}    culture                  The {@link } to use (InvariantCulture if NULL)
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOCounter: function (target, fromValue, endValue, duration, addThousandsSeparator, culture) {
                    if (addThousandsSeparator === void 0) { addThousandsSeparator = true; }
                    if (culture === void 0) { culture = null; }
                    var v = fromValue;
                    var cInfo = !addThousandsSeparator ? null : culture || System.Globalization.CultureInfo.invariantCulture;
                    var t = DG.Tweening.DOTween.To$2(function () {
                        return v;
                    }, function (x) {
                        v = x;
                        target.text = addThousandsSeparator ? System.Int32.format(v, "N0", cInfo) : Bridge.toString(v);
                    }, endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(System.Int32,System.Int32,DG.Tweening.Plugins.Options.NoOptions), t, target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOCounter:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOText:static start.*/
                /**
                 * Tweens a Text's text to the given value.
                 Also stores the Text as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Text}               target             
                 * @param   {string}                            endValue           The end string to tween to
                 * @param   {number}                            duration           The duration of the tween
                 * @param   {boolean}                           richTextEnabled    If TRUE (default), rich text will be interpreted correctly while animated,
                 otherwise all tags will be considered as normal text
                 * @param   {DG.Tweening.ScrambleMode}          scrambleMode       The type of scramble mode to use, if any
                 * @param   {string}                            scrambleChars      A string containing the characters to use for scrambling.
                 Use as many characters as possible (minimum 10) because DOTween uses a fast scramble mode which gives better results with more characters.
                 Leave it to NULL (default) to use default ones
                 * @return  {DG.Tweening.Core.TweenerCore$3}
                 */
                DOText: function (target, endValue, duration, richTextEnabled, scrambleMode, scrambleChars) {
                    if (richTextEnabled === void 0) { richTextEnabled = true; }
                    if (scrambleMode === void 0) { scrambleMode = 0; }
                    if (scrambleChars === void 0) { scrambleChars = null; }
                    if (endValue == null) {
                        if (DG.Tweening.Core.Debugger.logPriority > 0) {
                            DG.Tweening.Core.Debugger.LogWarning("You can't pass a NULL string to DOText: an empty string will be used instead to avoid errors");
                        }
                        endValue = "";
                    }
                    var t = DG.Tweening.DOTween.To$5(function () {
                        return target.text;
                    }, function (x) {
                        target.text = x;
                    }, endValue, duration);
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Tweener, DG.Tweening.TweenSettingsExtensions.SetOptions$3(t, richTextEnabled, scrambleMode, scrambleChars), target);
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUI.DOText:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOBlendableColor:static start.*/
                /**
                 * Tweens a Graphic's color to the given value,
                 in a way that allows other DOBlendableColor tweens to work together on the same target,
                 instead than fight each other as multiple DOColor would do.
                 Also stores the Graphic as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Graphic}    target      
                 * @param   {UnityEngine.Color}         endValue    The value to tween to
                 * @param   {number}                    duration    The duration of the tween
                 * @return  {DG.Tweening.Tweener}
                 */
                DOBlendableColor: function (target, endValue, duration) {
                    var $t;
                    endValue = ($t = target.color, new pc.Color( endValue.r - $t.r, endValue.g - $t.g, endValue.b - $t.b, endValue.a - $t.a ));
                    var to = new pc.Color( 0, 0, 0, 0 );
                    return DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), DG.Tweening.Core.Extensions.Blendable(UnityEngine.Color, UnityEngine.Color, DG.Tweening.Plugins.Options.ColorOptions, DG.Tweening.DOTween.To$8(function () {
                        return to;
                    }, function (x) {
                        var $t1;
                        var diff = new pc.Color( x.r - to.r, x.g - to.g, x.b - to.b, x.a - to.a );
                        to = x.$clone();
                        target.color = ($t1 = target.color.$clone(), new pc.Color( $t1.r + diff.$clone().r, $t1.g + diff.$clone().g, $t1.b + diff.$clone().b, $t1.a + diff.$clone().a ));
                    }, endValue.$clone(), duration)), target);
                },
                /*DG.Tweening.DOTweenModuleUI.DOBlendableColor:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOBlendableColor$1:static start.*/
                /**
                 * Tweens a Image's color to the given value,
                 in a way that allows other DOBlendableColor tweens to work together on the same target,
                 instead than fight each other as multiple DOColor would do.
                 Also stores the Image as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Image}    target      
                 * @param   {UnityEngine.Color}       endValue    The value to tween to
                 * @param   {number}                  duration    The duration of the tween
                 * @return  {DG.Tweening.Tweener}
                 */
                DOBlendableColor$1: function (target, endValue, duration) {
                    var $t;
                    endValue = ($t = target.color, new pc.Color( endValue.r - $t.r, endValue.g - $t.g, endValue.b - $t.b, endValue.a - $t.a ));
                    var to = new pc.Color( 0, 0, 0, 0 );
                    return DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), DG.Tweening.Core.Extensions.Blendable(UnityEngine.Color, UnityEngine.Color, DG.Tweening.Plugins.Options.ColorOptions, DG.Tweening.DOTween.To$8(function () {
                        return to;
                    }, function (x) {
                        var $t1;
                        var diff = new pc.Color( x.r - to.r, x.g - to.g, x.b - to.b, x.a - to.a );
                        to = x.$clone();
                        target.color = ($t1 = target.color.$clone(), new pc.Color( $t1.r + diff.$clone().r, $t1.g + diff.$clone().g, $t1.b + diff.$clone().b, $t1.a + diff.$clone().a ));
                    }, endValue.$clone(), duration)), target);
                },
                /*DG.Tweening.DOTweenModuleUI.DOBlendableColor$1:static end.*/

                /*DG.Tweening.DOTweenModuleUI.DOBlendableColor$2:static start.*/
                /**
                 * Tweens a Text's color BY the given value,
                 in a way that allows other DOBlendableColor tweens to work together on the same target,
                 instead than fight each other as multiple DOColor would do.
                 Also stores the Text as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI
                 * @memberof DG.Tweening.DOTweenModuleUI
                 * @param   {UnityEngine.UI.Text}    target      
                 * @param   {UnityEngine.Color}      endValue    The value to tween to
                 * @param   {number}                 duration    The duration of the tween
                 * @return  {DG.Tweening.Tweener}
                 */
                DOBlendableColor$2: function (target, endValue, duration) {
                    var $t;
                    endValue = ($t = target.color, new pc.Color( endValue.r - $t.r, endValue.g - $t.g, endValue.b - $t.b, endValue.a - $t.a ));
                    var to = new pc.Color( 0, 0, 0, 0 );
                    return DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), DG.Tweening.Core.Extensions.Blendable(UnityEngine.Color, UnityEngine.Color, DG.Tweening.Plugins.Options.ColorOptions, DG.Tweening.DOTween.To$8(function () {
                        return to;
                    }, function (x) {
                        var $t1;
                        var diff = new pc.Color( x.r - to.r, x.g - to.g, x.b - to.b, x.a - to.a );
                        to = x.$clone();
                        target.color = ($t1 = target.color.$clone(), new pc.Color( $t1.r + diff.$clone().r, $t1.g + diff.$clone().g, $t1.b + diff.$clone().b, $t1.a + diff.$clone().a ));
                    }, endValue.$clone(), duration)), target);
                },
                /*DG.Tweening.DOTweenModuleUI.DOBlendableColor$2:static end.*/


            }
        }
    });
    /*DG.Tweening.DOTweenModuleUI end.*/

    /*DG.Tweening.DOTweenModuleUI+Utils start.*/
    Bridge.define("DG.Tweening.DOTweenModuleUI.Utils", {
        $kind: "nested class",
        statics: {
            methods: {
                /*DG.Tweening.DOTweenModuleUI+Utils.SwitchToRectTransform:static start.*/
                /**
                 * Converts the anchoredPosition of the first RectTransform to the second RectTransform,
                 taking into consideration offset, anchors and pivot, and returns the new anchoredPosition
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUI.Utils
                 * @memberof DG.Tweening.DOTweenModuleUI.Utils
                 * @param   {UnityEngine.RectTransform}    from    
                 * @param   {UnityEngine.RectTransform}    to
                 * @return  {UnityEngine.Vector2}
                 */
                SwitchToRectTransform: function (from, to) {
                    var localPoint = { v : new UnityEngine.Vector2() };
                    var fromPivotDerivedOffset = new pc.Vec2( from.rect.width * 0.5 + from.rect.xMin, from.rect.height * 0.5 + from.rect.yMin );
                    var screenP = UnityEngine.RectTransformUtility.WorldToScreenPoint(null, from.position.$clone());
                    screenP = screenP.$clone().add( fromPivotDerivedOffset.$clone() );
                    UnityEngine.RectTransformUtility.ScreenPointToLocalPointInRectangle(to, screenP, null, localPoint);
                    var pivotDerivedOffset = new pc.Vec2( to.rect.width * 0.5 + to.rect.xMin, to.rect.height * 0.5 + to.rect.yMin );
                    return to.anchoredPosition.$clone().add( localPoint.v ).sub( pivotDerivedOffset );
                },
                /*DG.Tweening.DOTweenModuleUI+Utils.SwitchToRectTransform:static end.*/


            }
        }
    });
    /*DG.Tweening.DOTweenModuleUI+Utils end.*/

    /*DG.Tweening.DOTweenModuleUnityVersion start.*/
    /** @namespace DG.Tweening */

    /**
     * Shortcuts/functions that are not strictly related to specific Modules
     but are available only on some Unity versions
     *
     * @static
     * @abstract
     * @public
     * @class DG.Tweening.DOTweenModuleUnityVersion
     */
    Bridge.define("DG.Tweening.DOTweenModuleUnityVersion", {
        statics: {
            methods: {
                /*DG.Tweening.DOTweenModuleUnityVersion.DOGradientColor:static start.*/
                /**
                 * Tweens a Material's color using the given gradient
                 (NOTE 1: only uses the colors of the gradient, not the alphas - NOTE 2: creates a Sequence, not a Tweener).
                 Also stores the image as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUnityVersion
                 * @memberof DG.Tweening.DOTweenModuleUnityVersion
                 * @param   {UnityEngine.Material}    target      
                 * @param   {UnityEngine.Gradient}    gradient    The gradient to use
                 * @param   {number}                  duration    The duration of the tween
                 * @return  {DG.Tweening.Sequence}
                 */
                DOGradientColor: function (target, gradient, duration) {
                    var s = DG.Tweening.DOTween.Sequence();
                    var colors = gradient.colorKeys;
                    var len = colors.length;
                    for (var i = 0; i < len; i = (i + 1) | 0) {
                        var c = colors[i];
                        if (i === 0 && c.time <= 0) {
                            target.color = c.color.$clone();
                            continue;
                        }
                        var colorDuration = i === ((len - 1) | 0) ? duration - DG.Tweening.TweenExtensions.Duration(s, false) : duration * (i === 0 ? c.time : c.time - colors[((i - 1) | 0)].time);
                        DG.Tweening.TweenSettingsExtensions.Append(s, DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), DG.Tweening.ShortcutExtensions.DOColor$3(target, c.color.$clone(), colorDuration), DG.Tweening.Ease.Linear));
                    }
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Sequence, s, target);
                    return s;
                },
                /*DG.Tweening.DOTweenModuleUnityVersion.DOGradientColor:static end.*/

                /*DG.Tweening.DOTweenModuleUnityVersion.DOGradientColor$1:static start.*/
                /**
                 * Tweens a Material's named color property using the given gradient
                 (NOTE 1: only uses the colors of the gradient, not the alphas - NOTE 2: creates a Sequence, not a Tweener).
                 Also stores the image as the tween's target so it can be used for filtered operations
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUnityVersion
                 * @memberof DG.Tweening.DOTweenModuleUnityVersion
                 * @param   {UnityEngine.Material}    target      
                 * @param   {UnityEngine.Gradient}    gradient    The gradient to use
                 * @param   {string}                  property    The name of the material property to tween (like _Tint or _SpecColor)
                 * @param   {number}                  duration    The duration of the tween
                 * @return  {DG.Tweening.Sequence}
                 */
                DOGradientColor$1: function (target, gradient, property, duration) {
                    var s = DG.Tweening.DOTween.Sequence();
                    var colors = gradient.colorKeys;
                    var len = colors.length;
                    for (var i = 0; i < len; i = (i + 1) | 0) {
                        var c = colors[i];
                        if (i === 0 && c.time <= 0) {
                            target.SetColor$1(property, c.color.$clone());
                            continue;
                        }
                        var colorDuration = i === ((len - 1) | 0) ? duration - DG.Tweening.TweenExtensions.Duration(s, false) : duration * (i === 0 ? c.time : c.time - colors[((i - 1) | 0)].time);
                        DG.Tweening.TweenSettingsExtensions.Append(s, DG.Tweening.TweenSettingsExtensions.SetEase$2(DG.Tweening.Core.TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions), DG.Tweening.ShortcutExtensions.DOColor$4(target, c.color.$clone(), property, colorDuration), DG.Tweening.Ease.Linear));
                    }
                    DG.Tweening.TweenSettingsExtensions.SetTarget(DG.Tweening.Sequence, s, target);
                    return s;
                },
                /*DG.Tweening.DOTweenModuleUnityVersion.DOGradientColor$1:static end.*/

                /*DG.Tweening.DOTweenModuleUnityVersion.WaitForCompletion:static start.*/
                /**
                 * Returns a {@link } that waits until the tween is killed or complete.
                 It can be used inside a coroutine as a yield.
                 <p>Example usage:</p><pre><code>yield return myTween.WaitForCompletion(true);</code></pre>
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUnityVersion
                 * @memberof DG.Tweening.DOTweenModuleUnityVersion
                 * @param   {DG.Tweening.Tween}                     t                               
                 * @param   {boolean}                               returnCustomYieldInstruction
                 * @return  {UnityEngine.CustomYieldInstruction}
                 */
                WaitForCompletion: function (t, returnCustomYieldInstruction) {
                    if (!t.active) {
                        if (DG.Tweening.Core.Debugger.logPriority > 0) {
                            DG.Tweening.Core.Debugger.LogInvalidTween(t);
                        }
                        return null;
                    }
                    return new DG.Tweening.DOTweenCYInstruction.WaitForCompletion(t);
                },
                /*DG.Tweening.DOTweenModuleUnityVersion.WaitForCompletion:static end.*/

                /*DG.Tweening.DOTweenModuleUnityVersion.WaitForRewind:static start.*/
                /**
                 * Returns a {@link } that waits until the tween is killed or rewinded.
                 It can be used inside a coroutine as a yield.
                 <p>Example usage:</p><pre><code>yield return myTween.WaitForRewind();</code></pre>
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUnityVersion
                 * @memberof DG.Tweening.DOTweenModuleUnityVersion
                 * @param   {DG.Tweening.Tween}                     t                               
                 * @param   {boolean}                               returnCustomYieldInstruction
                 * @return  {UnityEngine.CustomYieldInstruction}
                 */
                WaitForRewind: function (t, returnCustomYieldInstruction) {
                    if (!t.active) {
                        if (DG.Tweening.Core.Debugger.logPriority > 0) {
                            DG.Tweening.Core.Debugger.LogInvalidTween(t);
                        }
                        return null;
                    }
                    return new DG.Tweening.DOTweenCYInstruction.WaitForRewind(t);
                },
                /*DG.Tweening.DOTweenModuleUnityVersion.WaitForRewind:static end.*/

                /*DG.Tweening.DOTweenModuleUnityVersion.WaitForKill:static start.*/
                /**
                 * Returns a {@link } that waits until the tween is killed.
                 It can be used inside a coroutine as a yield.
                 <p>Example usage:</p><pre><code>yield return myTween.WaitForKill();</code></pre>
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUnityVersion
                 * @memberof DG.Tweening.DOTweenModuleUnityVersion
                 * @param   {DG.Tweening.Tween}                     t                               
                 * @param   {boolean}                               returnCustomYieldInstruction
                 * @return  {UnityEngine.CustomYieldInstruction}
                 */
                WaitForKill: function (t, returnCustomYieldInstruction) {
                    if (!t.active) {
                        if (DG.Tweening.Core.Debugger.logPriority > 0) {
                            DG.Tweening.Core.Debugger.LogInvalidTween(t);
                        }
                        return null;
                    }
                    return new DG.Tweening.DOTweenCYInstruction.WaitForKill(t);
                },
                /*DG.Tweening.DOTweenModuleUnityVersion.WaitForKill:static end.*/

                /*DG.Tweening.DOTweenModuleUnityVersion.WaitForElapsedLoops:static start.*/
                /**
                 * Returns a {@link } that waits until the tween is killed or has gone through the given amount of loops.
                 It can be used inside a coroutine as a yield.
                 <p>Example usage:</p><pre><code>yield return myTween.WaitForElapsedLoops(2);</code></pre>
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUnityVersion
                 * @memberof DG.Tweening.DOTweenModuleUnityVersion
                 * @param   {DG.Tweening.Tween}                     t                               
                 * @param   {number}                                elapsedLoops                    Elapsed loops to wait for
                 * @param   {boolean}                               returnCustomYieldInstruction
                 * @return  {UnityEngine.CustomYieldInstruction}
                 */
                WaitForElapsedLoops: function (t, elapsedLoops, returnCustomYieldInstruction) {
                    if (!t.active) {
                        if (DG.Tweening.Core.Debugger.logPriority > 0) {
                            DG.Tweening.Core.Debugger.LogInvalidTween(t);
                        }
                        return null;
                    }
                    return new DG.Tweening.DOTweenCYInstruction.WaitForElapsedLoops(t, elapsedLoops);
                },
                /*DG.Tweening.DOTweenModuleUnityVersion.WaitForElapsedLoops:static end.*/

                /*DG.Tweening.DOTweenModuleUnityVersion.WaitForPosition:static start.*/
                /**
                 * Returns a {@link } that waits until the tween is killed
                 or has reached the given time position (loops included, delays excluded).
                 It can be used inside a coroutine as a yield.
                 <p>Example usage:</p><pre><code>yield return myTween.WaitForPosition(2.5f);</code></pre>
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUnityVersion
                 * @memberof DG.Tweening.DOTweenModuleUnityVersion
                 * @param   {DG.Tweening.Tween}                     t                               
                 * @param   {number}                                position                        Position (loops included, delays excluded) to wait for
                 * @param   {boolean}                               returnCustomYieldInstruction
                 * @return  {UnityEngine.CustomYieldInstruction}
                 */
                WaitForPosition: function (t, position, returnCustomYieldInstruction) {
                    if (!t.active) {
                        if (DG.Tweening.Core.Debugger.logPriority > 0) {
                            DG.Tweening.Core.Debugger.LogInvalidTween(t);
                        }
                        return null;
                    }
                    return new DG.Tweening.DOTweenCYInstruction.WaitForPosition(t, position);
                },
                /*DG.Tweening.DOTweenModuleUnityVersion.WaitForPosition:static end.*/

                /*DG.Tweening.DOTweenModuleUnityVersion.WaitForStart:static start.*/
                /**
                 * Returns a {@link } that waits until the tween is killed or started
                 (meaning when the tween is set in a playing state the first time, after any eventual delay).
                 It can be used inside a coroutine as a yield.
                 <p>Example usage:</p><pre><code>yield return myTween.WaitForStart();</code></pre>
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUnityVersion
                 * @memberof DG.Tweening.DOTweenModuleUnityVersion
                 * @param   {DG.Tweening.Tween}                     t                               
                 * @param   {boolean}                               returnCustomYieldInstruction
                 * @return  {UnityEngine.CustomYieldInstruction}
                 */
                WaitForStart: function (t, returnCustomYieldInstruction) {
                    if (!t.active) {
                        if (DG.Tweening.Core.Debugger.logPriority > 0) {
                            DG.Tweening.Core.Debugger.LogInvalidTween(t);
                        }
                        return null;
                    }
                    return new DG.Tweening.DOTweenCYInstruction.WaitForStart(t);
                },
                /*DG.Tweening.DOTweenModuleUnityVersion.WaitForStart:static end.*/


            }
        }
    });
    /*DG.Tweening.DOTweenModuleUnityVersion end.*/

    /*DG.Tweening.DOTweenModuleUtils start.*/
    /**
     * Utility functions that deal with available Modules.
     Modules defines:
     - DOTAUDIO
     - DOTPHYSICS
     - DOTPHYSICS2D
     - DOTSPRITE
     - DOTUI
     Extra defines set and used for implementation of external assets:
     - DOTWEEN_TMP ► TextMesh Pro
     - DOTWEEN_TK2D ► 2D Toolkit
     *
     * @static
     * @abstract
     * @public
     * @class DG.Tweening.DOTweenModuleUtils
     */
    Bridge.define("DG.Tweening.DOTweenModuleUtils", {
        statics: {
            fields: {
                _initialized: false
            },
            methods: {
                /*DG.Tweening.DOTweenModuleUtils.Init:static start.*/
                /**
                 * Called via Reflection by DOTweenComponent on Awake
                 *
                 * @static
                 * @public
                 * @this DG.Tweening.DOTweenModuleUtils
                 * @memberof DG.Tweening.DOTweenModuleUtils
                 * @return  {void}
                 */
                Init: function () {
                    if (DG.Tweening.DOTweenModuleUtils._initialized) {
                        return;
                    }

                    DG.Tweening.DOTweenModuleUtils._initialized = true;
                    DG.Tweening.Core.DOTweenExternalCommand.addSetOrientationOnPath(DG.Tweening.DOTweenModuleUtils.Physics.SetOrientationOnPath);

                },
                /*DG.Tweening.DOTweenModuleUtils.Init:static end.*/


            }
        }
    });
    /*DG.Tweening.DOTweenModuleUtils end.*/

    /*DG.Tweening.DOTweenModuleUtils+Physics start.*/
    Bridge.define("DG.Tweening.DOTweenModuleUtils.Physics", {
        $kind: "nested class",
        statics: {
            methods: {
                /*DG.Tweening.DOTweenModuleUtils+Physics.SetOrientationOnPath:static start.*/
                SetOrientationOnPath: function (options, t, newRot, trans) {
                    if (options.isRigidbody) {
                        Bridge.cast(t.target, UnityEngine.Rigidbody).rotation = newRot.$clone();
                    } else {
                        trans.rotation = newRot.$clone();
                    }
                },
                /*DG.Tweening.DOTweenModuleUtils+Physics.SetOrientationOnPath:static end.*/

                /*DG.Tweening.DOTweenModuleUtils+Physics.HasRigidbody2D:static start.*/
                HasRigidbody2D: function (target) {
                    return UnityEngine.Component.op_Inequality(target.GetComponent(UnityEngine.Rigidbody2D), null);
                },
                /*DG.Tweening.DOTweenModuleUtils+Physics.HasRigidbody2D:static end.*/

                /*DG.Tweening.DOTweenModuleUtils+Physics.HasRigidbody:static start.*/
                HasRigidbody: function (target) {
                    return UnityEngine.Component.op_Inequality(target.GetComponent(UnityEngine.Rigidbody), null);
                },
                /*DG.Tweening.DOTweenModuleUtils+Physics.HasRigidbody:static end.*/

                /*DG.Tweening.DOTweenModuleUtils+Physics.CreateDOTweenPathTween:static start.*/
                CreateDOTweenPathTween: function (target, tweenRigidbody, isLocal, path, duration, pathMode) {
                    var t;
                    var rBody = tweenRigidbody ? target.GetComponent(UnityEngine.Rigidbody) : null;
                    if (tweenRigidbody && UnityEngine.Component.op_Inequality(rBody, null)) {
                        t = isLocal ? DG.Tweening.DOTweenModulePhysics.DOLocalPath$1(rBody, path, duration, pathMode) : DG.Tweening.DOTweenModulePhysics.DOPath$1(rBody, path, duration, pathMode);
                    } else {
                        t = isLocal ? DG.Tweening.ShortcutExtensions.DOLocalPath(target.transform, path, duration, pathMode) : DG.Tweening.ShortcutExtensions.DOPath(target.transform, path, duration, pathMode);
                    }
                    return t;
                },
                /*DG.Tweening.DOTweenModuleUtils+Physics.CreateDOTweenPathTween:static end.*/


            }
        }
    });
    /*DG.Tweening.DOTweenModuleUtils+Physics end.*/

    /*Difficulty start.*/
    Bridge.define("Difficulty", {
        $kind: "enum",
        statics: {
            fields: {
                easy: 0,
                hard: 1
            }
        }
    });
    /*Difficulty end.*/

    /*Farmable start.*/
    Bridge.define("Farmable", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            resourceStatus: 0,
            resourceType: 0,
            magnetRange: 0,
            sourceHealth: 0
        },
        ctors: {
            init: function () {
                this.magnetRange = 4.0;
            }
        },
        methods: {
            /*Farmable.Start start.*/
            Start: function () {

            },
            /*Farmable.Start end.*/

            /*Farmable.Update start.*/
            Update: function () {
                if (this.resourceStatus === ResourceStatus.pickup) {
                    if (UnityEngine.Component.op_Inequality(this.transform, null)) {
                        if (pc.Vec3.distance( GameManager.instance.player.transform.GetChild(0).position, this.transform.position ) <= this.magnetRange) {
                            DG.Tweening.ShortcutExtensions.DOMove(this.transform, GameManager.instance.player.transform.GetChild(0).position.$clone(), 0.4);
                        }
                    }
                }
            },
            /*Farmable.Update end.*/


        }
    });
    /*Farmable end.*/

    /*GameManager start.*/
    Bridge.define("GameManager", {
        inherits: [UnityEngine.MonoBehaviour,UnityEngine.ISerializationCallbackReceiver],
        statics: {
            fields: {
                instance: null,
                totalcoinKey: null,
                totalWoodKey: null,
                totalGoldKey: null,
                totalSilverKey: null,
                totalDiamondKey: null,
                worldKey: null,
                levelKey: null,
                gamelevelKey: null
            },
            ctors: {
                init: function () {
                    this.totalcoinKey = "totalcoinKey";
                    this.totalWoodKey = "totalwoodKey";
                    this.totalGoldKey = "totalgoldKey";
                    this.totalSilverKey = "totalsilverKey";
                    this.totalDiamondKey = "totaldiamondKey";
                    this.worldKey = "worldKey";
                    this.levelKey = "levelKey";
                    this.gamelevelKey = "gamelevelKey";
                }
            }
        },
        fields: {
            gameOverPanelStatus: 0,
            difficulty: 0,
            startGame: false,
            victory: false,
            player: null,
            playerCon: null,
            botSpawner: null,
            endCamPos: null,
            mainCam: null,
            totalCoin: 0,
            coinPrefab: null,
            totalWood: 0,
            ingameWoodCount: 0,
            totalGold: 0,
            totalSilver: 0,
            totalDiamond: 0,
            tapFX: null,
            popFX: null,
            hitFX: null,
            hitTreeFX: null,
            hitGoldFX: null,
            hitSilverFX: null,
            hitDiamondFX: null,
            portalPrefab: null,
            dmgTextPopupPrefab: null,
            woodPlusTextPopupPrefab: null,
            confettiFX: null,
            worldID: 0,
            levelID: 0,
            botsKilled: 0,
            botsToKill: 0,
            environments: null,
            ground: null,
            groundMats: null,
            gameLevel: 0,
            woodPickupPrefab: null,
            woodLogPrefab: null,
            resourcePickupPrefabs: null,
            resourcePickup5StacksPrefabs: null,
            arrows: null
        },
        alias: [
            "OnBeforeSerialize", "UnityEngine$ISerializationCallbackReceiver$OnBeforeSerialize",
            "OnAfterDeserialize", "UnityEngine$ISerializationCallbackReceiver$OnAfterDeserialize"
        ],
        methods: {
            /*GameManager.Awake start.*/
            Awake: function () {
                GameManager.instance = this;


            },
            /*GameManager.Awake end.*/

            /*GameManager.Start start.*/
            Start: function () {
                //core stuff
                if (UnityEngine.GameObject.op_Inequality(this.player, null)) {
                    this.playerCon = this.player.GetComponent(PlayerController);
                }

                this.levelID = UnityEngine.PlayerPrefs.GetInt(GameManager.levelKey, 0) % 9;
                this.gameLevel = UnityEngine.PlayerPrefs.GetInt(GameManager.gamelevelKey, 0);
                this.worldID = UnityEngine.PlayerPrefs.GetInt(GameManager.worldKey, 0);
                this.totalCoin = UnityEngine.PlayerPrefs.GetInt(GameManager.totalcoinKey, 0);
                this.totalWood = UnityEngine.PlayerPrefs.GetInt(GameManager.totalWoodKey, 0);
                UIManager.instance.UpdateWorldUI(this.worldID);
                if (!UnityEngine.PlayerPrefs.HasKey("levelCountWorld0")) {
                    for (var i = 0; i < 10; i = (i + 1) | 0) {
                        UnityEngine.PlayerPrefs.SetInt("levelCountWorld" + i, 0);
                    }
                }

                this.DifficultyControl();
                this.FOVControl();

            },
            /*GameManager.Start end.*/

            /*GameManager.Update start.*/
            Update: function () {
                this.FOVControl();
            },
            /*GameManager.Update end.*/

            /*GameManager.FOVControl start.*/
            FOVControl: function () {
                if (((Bridge.Int.div(UnityEngine.Screen.height, UnityEngine.Screen.width)) | 0) >= 1) {
                    //portrait
                    UnityEngine.Camera.main.fieldOfView = 70;
                } else {
                    //landscape
                    UnityEngine.Camera.main.fieldOfView = 45;
                }
            },
            /*GameManager.FOVControl end.*/

            /*GameManager.DifficultyControl start.*/
            DifficultyControl: function () {
                if (this.difficulty === Difficulty.easy) {
                    this.playerCon.maxHealth = 10;
                    this.botSpawner.GetComponent(BotSpawner).spawnTimeMax = 5;
                    this.botSpawner.GetComponent(BotSpawner).enemyCountMax = 5;
                } else if (this.difficulty === Difficulty.hard) {
                    this.playerCon.maxHealth = 5;
                    this.botSpawner.GetComponent(BotSpawner).spawnTimeMax = 3;
                    this.botSpawner.GetComponent(BotSpawner).enemyCountMax = 15;
                }
            },
            /*GameManager.DifficultyControl end.*/

            /*GameManager.CheckLevelProgression start.*/
            CheckLevelProgression: function () {
                if (!this.victory) {
                    this.botsKilled = (this.botsKilled + 1) | 0;
                    UIManager.instance.levelProgBar.fillAmount = this.botsKilled / this.botsToKill;
                    if (this.botsKilled >= this.botsToKill) {
                        UnityEngine.Debug.Log$1("level complete");
                        this.victory = true;
                        var portalIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, this.portalPrefab, new pc.Vec3( this.player.transform.position.x, this.player.transform.position.y + 3, this.player.transform.position.z + 3 ), this.portalPrefab.transform.rotation.$clone());
                        SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.portalSFX);
                    }
                }
            },
            /*GameManager.CheckLevelProgression end.*/

            /*GameManager.LevelCompleteUponEnteringPortal start.*/
            LevelCompleteUponEnteringPortal: function () {
                var $t;
                this.gameLevel = (this.gameLevel + 1) | 0;
                UnityEngine.PlayerPrefs.SetInt(GameManager.gamelevelKey, this.gameLevel);

                this.levelID = (((this.levelID + 1) | 0));

                //int levelCountWorld = PlayerPrefs.GetInt("levelCountWorld" + worldID);
                UnityEngine.PlayerPrefs.SetInt("levelCountWorld" + this.worldID, this.levelID);


                //health aktu barbe
                ($t = this.playerCon).health = ($t.health + 10) | 0;
                if (this.playerCon.health > 100) {
                    this.playerCon.health = 100;
                }
                UnityEngine.PlayerPrefs.SetInt(this.playerCon.healthKey, this.playerCon.health);
                UnityEngine.Debug.Log$1("levelID " + this.levelID);
                if (this.levelID >= 9) {
                    UnityEngine.PlayerPrefs.SetInt("levelCountWorld" + this.worldID, 0);
                    this.worldID = (this.worldID + 1) | 0;
                    UnityEngine.PlayerPrefs.SetInt(GameManager.worldKey, this.worldID);
                    this.levelID = 0;
                    this.playerCon.health = this.playerCon.maxHealth;
                    UnityEngine.PlayerPrefs.SetInt(this.playerCon.healthKey, this.playerCon.health);
                    UIManager.instance.UpdateWorldUI(this.worldID);

                }



                var maxLevelCompleted = UnityEngine.PlayerPrefs.HasKey("maxLevelCompleted") ? UnityEngine.PlayerPrefs.GetInt("maxLevelCompleted") : 0;

                if (maxLevelCompleted <= this.gameLevel) {
                    maxLevelCompleted = this.gameLevel;
                    UnityEngine.PlayerPrefs.SetInt("maxLevelCompleted", maxLevelCompleted);
                }


                //coin add
                if (maxLevelCompleted % 3 === 0) {

                    if ((((Bridge.Int.div(maxLevelCompleted, 3)) | 0)) % 3 === 0) {
                        this.GiveCoin(((((100) + (Bridge.Int.mul(this.worldID, 50))) | 0)));

                    } else if ((((Bridge.Int.div(maxLevelCompleted, 3)) | 0)) % 2 === 0) {
                        this.GiveCoin(((((75) + (Bridge.Int.mul(this.worldID, 50))) | 0)));

                    } else {
                        this.GiveCoin((((50) + (Bridge.Int.mul(this.worldID, 50))) | 0));
                    }

                }



                //levelID = levelID % 9;
                UnityEngine.PlayerPrefs.SetInt(GameManager.levelKey, this.levelID);


                //completePanel
                if (this.levelID % 3 === 0) {
                    this.player.GetComponent(PlayerController).CompleteLevel();
                } else {
                    UIManager.instance.NextBtnCallback();
                }


                //end of world check
                if (this.worldID > 9) {
                    this.worldID = 0;
                    UnityEngine.PlayerPrefs.SetInt(GameManager.worldKey, this.worldID);
                }


            },
            /*GameManager.LevelCompleteUponEnteringPortal end.*/

            /*GameManager.SetCurrentWorld start.*/
            SetCurrentWorld: function () {
                this.environments[0].SetActive(true);
                // level world select design
                //if (worldID % 2 == 0)
                //{
                //    environments[0].SetActive(true);
                //    surface.BuildNavMesh();
                //}
                //else
                //{
                //    environments[1].SetActive(true);
                //    surface.BuildNavMesh();
                //}

                //for (int g = 0; g < ground.Length; g++)
                //{
                //    ground[g].GetComponent<MeshRenderer>().material = groundMats[worldID/2];
                //}
                this.BotAmount();



            },
            /*GameManager.SetCurrentWorld end.*/

            /*GameManager.BotAmount start.*/
            BotAmount: function () {

                //enemy count decider
                this.botsToKill = (((3 + this.worldID) | 0) + ((Bridge.Int.div(this.levelID, 3)) | 0)) | 0;

                if (this.botsToKill > 10) {
                    this.botsToKill = 10;
                }

                //Debug.LogError("botsToKill:"+ botsToKill);
            },
            /*GameManager.BotAmount end.*/

            /*GameManager.GiveCoin start.*/
            GiveCoin: function (i) {
                this.totalCoin = (this.totalCoin + i) | 0;
                UnityEngine.PlayerPrefs.SetInt(GameManager.totalcoinKey, this.totalCoin);
            },
            /*GameManager.GiveCoin end.*/

            /*GameManager.GiveWood start.*/
            GiveWood: function (i) {
                this.ingameWoodCount = (this.ingameWoodCount + i) | 0;
                this.totalWood = (this.totalWood + i) | 0;
                UnityEngine.PlayerPrefs.SetInt(GameManager.totalWoodKey, this.totalWood);
            },
            /*GameManager.GiveWood end.*/

            /*GameManager.OnBeforeSerialize start.*/
            OnBeforeSerialize: function () {

            },
            /*GameManager.OnBeforeSerialize end.*/

            /*GameManager.OnAfterDeserialize start.*/
            OnAfterDeserialize: function () {

            },
            /*GameManager.OnAfterDeserialize end.*/


        }
    });
    /*GameManager end.*/

    /*GameOverPanelStatus start.*/
    Bridge.define("GameOverPanelStatus", {
        $kind: "enum",
        statics: {
            fields: {
                on: 0,
                off: 1
            }
        }
    });
    /*GameOverPanelStatus end.*/

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    Bridge.define("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", {
        inherits: [UnityEngine.MonoBehaviour]
    });
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    /*LocalizationImageSet start.*/
    Bridge.define("LocalizationImageSet", {
        fields: {
            Name: null,
            Image: null,
            Str: null
        }
    });
    /*LocalizationImageSet end.*/

    /*LocalizationReplacer start.*/
    Bridge.define("LocalizationReplacer", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            MyImage: null,
            Mytxt: null,
            localizationDatas: null
        },
        methods: {
            /*LocalizationReplacer.Awake start.*/
            Awake: function () {
                this.MyImage = this.GetComponent(UnityEngine.UI.Image);
                this.Mytxt = this.GetComponent(UnityEngine.UI.Text);


                this.SetData();


            },
            /*LocalizationReplacer.Awake end.*/

            /*LocalizationReplacer.Update start.*/
            Update: function () {

            },
            /*LocalizationReplacer.Update end.*/

            /*LocalizationReplacer.SetData start.*/
            SetData: function () {
                var i = 0;
                var systemlang = UnityEngine.Application.systemLanguage;
                // systemlang = SystemLanguage.Japanese;
                //if (systemlang == SystemLanguage.Japanese)
                //{
                //    i = 1;
                //}

                if (systemlang === UnityEngine.SystemLanguage.ChineseTraditional) {
                    i = 2;
                } else if ((systemlang === UnityEngine.SystemLanguage.ChineseSimplified)) {

                    i = 3;

                } else {
                    i = 0;

                }
                if (i > System.Linq.Enumerable.from(this.localizationDatas, LocalizationImageSet).count()) {
                    i = 0;
                }
                var data = this.localizationDatas[i];
                //logic for image or text
                if (UnityEngine.MonoBehaviour.op_Inequality(this.MyImage, null)) {

                    this.SetImage(data);
                } else {

                    if (UnityEngine.MonoBehaviour.op_Inequality(this.Mytxt, null)) {
                        this.SetText(data);
                    }

                }
            },
            /*LocalizationReplacer.SetData end.*/

            /*LocalizationReplacer.SetImage start.*/
            SetImage: function (data) {
                if (data.Image != null) {
                    this.MyImage.sprite = data.Image;
                }
            },
            /*LocalizationReplacer.SetImage end.*/

            /*LocalizationReplacer.SetText start.*/
            SetText: function (data) {

                if (data.Str != null && data.Str.length > 0) {
                    this.Mytxt.text = data.Str;
                }
            },
            /*LocalizationReplacer.SetText end.*/


        }
    });
    /*LocalizationReplacer end.*/

    /*LumberCraft.PlayerInputController start.*/
    Bridge.define("LumberCraft.PlayerInputController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            player: null,
            speed: 0,
            movemenetSmoothing: 0,
            rotationSmoothing: 0,
            mouseCurrentPos: null,
            mouseStartPos: null,
            moveDirection: null,
            targetDirection: null,
            deviation: null,
            currentDragDistance: 0,
            maxDragDistance: 0,
            move: false,
            downloadNow: null
        },
        ctors: {
            init: function () {
                this.mouseCurrentPos = new UnityEngine.Vector3();
                this.mouseStartPos = new UnityEngine.Vector3();
                this.moveDirection = new UnityEngine.Vector3();
                this.targetDirection = new UnityEngine.Vector3();
                this.deviation = new UnityEngine.Vector3();
                this.speed = 6.0;
                this.movemenetSmoothing = 0.5;
                this.rotationSmoothing = 0.25;
                this.maxDragDistance = 10.0;
            }
        },
        methods: {
            /*LumberCraft.PlayerInputController.Start start.*/
            Start: function () {
                this.player = this.GetComponent(PlayerController);
            },
            /*LumberCraft.PlayerInputController.Start end.*/

            /*LumberCraft.PlayerInputController.Update start.*/
            Update: function () {
                if (!GameManager.instance.startGame) {
                    return;
                }
                if (this.player.dead) {
                    return;
                }

                this.HandlePlayerInput();
            },
            /*LumberCraft.PlayerInputController.Update end.*/

            /*LumberCraft.PlayerInputController.FixedUpdate start.*/
            FixedUpdate: function () {
                var $t;
                if (this.move) {
                    this.deviation = this.targetDirection.$clone().scale( this.speed ).scale( UnityEngine.Time.fixedDeltaTime );
                    this.player.rb.MovePosition(this.player.rb.position.$clone().add( this.deviation ));
                    if (!this.player.enemyContact) {
                        if (!pc.Vec3.equals( this.targetDirection, pc.Vec3.ZERO.clone() )) {
                            var targetRotation = new pc.Quat().setLookAt( this.targetDirection, pc.Vec3.UP );
                            if (($t = this.transform.rotation, ( $t == null && targetRotation != null ) || ( $t != null && targetRotation == null ) || ( $t != null && !$t.equals( targetRotation ) ))) {
                                //transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotationSmoothing);
                                //player.rb.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotationSmoothing);
                                this.player.rb.MoveRotation(new pc.Quat().slerp( this.transform.rotation, targetRotation, this.rotationSmoothing ));
                            }
                        }
                    }
                }
            },
            /*LumberCraft.PlayerInputController.FixedUpdate end.*/

            /*LumberCraft.PlayerInputController.displayButton start.*/
            displayButton: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new UnityEngine.WaitForSeconds(4.0);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.downloadNow.SetActive(true);

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*LumberCraft.PlayerInputController.displayButton end.*/

            /*LumberCraft.PlayerInputController.HandlePlayerInput start.*/
            HandlePlayerInput: function () {
                this.mouseCurrentPos = UnityEngine.Vector3.FromVector2(UnityEngine.Input.mousePosition.$clone());
                if (UnityEngine.Input.GetMouseButtonDown(0)) {
                    this.mouseStartPos = this.mouseCurrentPos.$clone();
                    if (!UIManager.instance.howtoPlayTapped) {
                        GameManager.instance.startGame = true;
                        UIManager.instance.tutorial.SetActive(false);
                        UIManager.instance.howtoPlayTapped = true;
                        this.StartCoroutine$1(this.displayButton());
                    }
                } else if (UnityEngine.Input.GetMouseButton(0) && !this.player.dead) {
                    this.currentDragDistance = (this.mouseCurrentPos.$clone().sub( this.mouseStartPos )).length();

                    if (this.currentDragDistance > this.maxDragDistance) {
                        //mouseStartPos = mouseCurrentPos - moveDirection * maxDragDistance;
                    }
                    this.move = true;
                    this.moveDirection = (this.mouseCurrentPos.$clone().sub( this.mouseStartPos )).clone().normalize().$clone();
                    this.targetDirection = new pc.Vec3( this.moveDirection.x, 0, this.moveDirection.y );
                    //transform.position += deviation;          
                    this.player.anim.SetBool$1("run", true);
                    //player.SimulateFootsteps();
                    this.player.footstepDelay += UnityEngine.Time.deltaTime;
                    if (this.player.footstepDelay >= 0.3) {
                        SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.footstepSFX);
                        this.player.footstepDelay = 0;
                    }
                } else if (UnityEngine.Input.GetMouseButtonUp(0)) {
                    this.move = false;
                    this.player.anim.SetBool$1("run", false);
                }
            },
            /*LumberCraft.PlayerInputController.HandlePlayerInput end.*/


        }
    });
    /*LumberCraft.PlayerInputController end.*/

    /*PanelCTA_UI start.*/
    Bridge.define("PanelCTA_UI", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            btnDownload: null,
            btnRetry: null
        },
        methods: {
            /*PanelCTA_UI.Start start.*/
            Start: function () {
                this.btnDownload.onClick.AddListener(Bridge.fn.bind(this, function () {
                    this.DownloadCallBack();
                }));
                DG.Tweening.TweenSettingsExtensions.SetLoops$1(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,UnityEngine.Vector3,DG.Tweening.Plugins.Options.VectorOptions), DG.Tweening.ShortcutExtensions.DOScale$1(this.btnDownload.transform.GetChild(0).GetComponent(UnityEngine.RectTransform), new pc.Vec3( 1, 1, 1 ).scale( 0.8 ), 0.8), -1, DG.Tweening.LoopType.Yoyo);
            },
            /*PanelCTA_UI.Start end.*/

            /*PanelCTA_UI.RetryCallBack start.*/
            RetryCallBack: function () {
                UnityEngine.SceneManagement.SceneManager.LoadScene(0);
            },
            /*PanelCTA_UI.RetryCallBack end.*/

            /*PanelCTA_UI.DownloadCallBack start.*/
            DownloadCallBack: function () {
                Luna.Unity.Playable.InstallFullGame();

            },
            /*PanelCTA_UI.DownloadCallBack end.*/


        }
    });
    /*PanelCTA_UI end.*/

    /*PanelSharkWorlds start.*/
    Bridge.define("PanelSharkWorlds", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            sharkWorldItem: null,
            sharkProgressItem: null,
            content: null,
            sharkWorlds: null,
            worldCount: 0,
            equippedIndex: 0,
            currentLevel: 0,
            maxLevelCompleted: 0,
            worldImages: null,
            WorldName: null
        },
        ctors: {
            init: function () {
                this.worldCount = 10;
                this.WorldName = System.Array.init(["Enchanted Forest", "Forgotten Land", "Death Valley", "Waste Land", "Middgard", "Silent Forest", "Spirit Hill", "Westerworld", "Badlands", "Hell Forest"], System.String);
            }
        },
        methods: {
            /*PanelSharkWorlds.Start start.*/
            Start: function () {
                this.playerPrefsLoad();
                this.Initialize();
            },
            /*PanelSharkWorlds.Start end.*/

            /*PanelSharkWorlds.Initialize start.*/
            Initialize: function () {
                var $t;
                this.sharkWorlds = System.Array.init(this.worldCount, null, SharkWorldItem);
                for (var worldNo = 0; worldNo < this.worldCount; worldNo = (worldNo + 1) | 0) {
                    var obj = UnityEngine.Object.Instantiate(UnityEngine.GameObject, this.sharkWorldItem, this.content);
                    var sharkworlditem = ($t = obj.GetComponent(SharkWorldItem), this.sharkWorlds[worldNo] = $t, $t);
                    sharkworlditem.Initialize(worldNo, this.currentLevel, this, this.worldImages.getItem(worldNo), this.WorldName[worldNo]);

                    //unlock worlds
                    if (worldNo <= ((Bridge.Int.div(this.maxLevelCompleted, 9)) | 0)) {
                        sharkworlditem.lockImage.SetActive(false);
                        sharkworlditem.btnEquip.gameObject.SetActive(true);
                    }


                    //progress panel laod
                    if (worldNo >= ((Bridge.Int.div(this.maxLevelCompleted, 9)) | 0)) {


                        for (var progressNo = 0; progressNo < 3; progressNo = (progressNo + 1) | 0) {
                            var progressItem = UnityEngine.Object.Instantiate(UnityEngine.GameObject, this.sharkProgressItem, this.content).GetComponent(SharkWorldProgressItem);
                            progressItem.init(sharkworlditem, worldNo, progressNo, this.maxLevelCompleted, ((((((50 + (Bridge.Int.mul(progressNo, 25))) | 0)) + (Bridge.Int.mul(worldNo, 50))) | 0)));
                            sharkworlditem.AddProgressItem(progressItem);
                            progressItem.txtClearLevel.text = "Clear " + Bridge.Int.mul(3, (((progressNo + 1) | 0))) + " Levels";


                        }
                    }

                }

            },
            /*PanelSharkWorlds.Initialize end.*/

            /*PanelSharkWorlds.playerPrefsLoad start.*/
            playerPrefsLoad: function () {
                this.currentLevel = UnityEngine.PlayerPrefs.GetInt("gamelevelKey", 0);
                this.maxLevelCompleted = UnityEngine.PlayerPrefs.HasKey("maxLevelCompleted") ? UnityEngine.PlayerPrefs.GetInt("maxLevelCompleted") : 0;

                if (this.maxLevelCompleted <= this.currentLevel) {
                    this.maxLevelCompleted = this.currentLevel;
                    UnityEngine.PlayerPrefs.SetInt("maxLevelCompleted", this.maxLevelCompleted);
                }



            },
            /*PanelSharkWorlds.playerPrefsLoad end.*/

            /*PanelSharkWorlds.Update start.*/
            Update: function () {

            },
            /*PanelSharkWorlds.Update end.*/


        }
    });
    /*PanelSharkWorlds end.*/

    /*PlayerBullet start.*/
    Bridge.define("PlayerBullet", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            speed: 0,
            target: null
        },
        ctors: {
            init: function () {
                this.speed = 70.0;
            }
        },
        methods: {
            /*PlayerBullet.GetTarget start.*/
            GetTarget: function (_target) {
                this.target = _target;
            },
            /*PlayerBullet.GetTarget end.*/

            /*PlayerBullet.Start start.*/
            Start: function () {

            },
            /*PlayerBullet.Start end.*/

            /*PlayerBullet.Update start.*/
            Update: function () {

                if (UnityEngine.Component.op_Equality(this.target, null)) {
                    UnityEngine.MonoBehaviour.Destroy(this.gameObject);
                    return;
                }
                var dir = this.target.position.$clone().sub( this.transform.position );

                var distanceThisFrame = this.speed * UnityEngine.Time.deltaTime;

                this.transform.Translate$1(dir.clone().normalize().$clone().scale( distanceThisFrame ), UnityEngine.Space.World);
            },
            /*PlayerBullet.Update end.*/

            /*PlayerBullet.OnTriggerEnter start.*/
            OnTriggerEnter: function (other) {
                var $t;
                if (other.gameObject.CompareTag("playerShield")) {
                    UnityEngine.MonoBehaviour.Destroy(this.gameObject);
                    UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                    var pop = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, GameManager.instance.hitFX, this.transform.position.$clone(), pc.Quat.IDENTITY.clone());
                    this.Destroy(pop, 1.0);
                    ($t = GameManager.instance.playerCon).shieldLevel = ($t.shieldLevel - 1) | 0;
                    if (GameManager.instance.playerCon.shieldLevel <= 0) {
                        GameManager.instance.playerCon.hasShield = false;
                    }
                }
                if (other.gameObject.CompareTag("Wall")) {
                    UnityEngine.MonoBehaviour.Destroy(this.gameObject);
                    var pop1 = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, GameManager.instance.hitFX, this.transform.position.$clone(), pc.Quat.IDENTITY.clone());
                    this.Destroy(pop1, 1.0);
                }
            },
            /*PlayerBullet.OnTriggerEnter end.*/


        }
    });
    /*PlayerBullet end.*/

    /*PlayerController start.*/
    Bridge.define("PlayerController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            anim: null,
            rb: null,
            clickable: null,
            running: false,
            dead: false,
            tapDelay: 0,
            tapped: false,
            footstepDelay: 0,
            healthKey: null,
            health: 0,
            maxHealth: 0,
            bullet: null,
            bulletForTrippleShoot: null,
            shootDelay: 0,
            shootDelayMax: 0,
            firePoints: null,
            shellPoint: null,
            bulletShellPrefab: null,
            canShoot: false,
            enemies: null,
            closestEnemy: null,
            enemyContact: false,
            muzzleFlash: null,
            target: null,
            range: 0,
            shieldPrefab: null,
            shieldPickup: null,
            hasShield: false,
            playerShield: null,
            shieldLevel: 0,
            hasTripleShoot: false,
            tripleShootTimer: 0,
            tripleShootTimerMax: 0,
            axeCollider: null,
            slashFX: null,
            axeAnim: null,
            woodPickRange: 0,
            woodStackParent: null,
            woodStack: null,
            building: false
        },
        ctors: {
            init: function () {
                this.clickable = new UnityEngine.LayerMask();
                this.tapDelay = 0;
                this.footstepDelay = 0;
                this.healthKey = "healthkey";
                this.range = 15.0;
                this.woodPickRange = 5.0;
            }
        },
        methods: {
            /*PlayerController.Start start.*/
            Start: function () {
                this.rb = this.GetComponent(UnityEngine.Rigidbody);
                this.anim = this.GetComponentInChildren(UnityEngine.Animator);
                //myAgent = GetComponent<NavMeshAgent>();
                this.closestEnemy = null;
                this.enemyContact = false;
                this.canShoot = false;

                UnityEngine.Debug.Log(this.anim);

                this.tripleShootTimer = this.tripleShootTimerMax;
                this.GetPlayerHealth();
                this.InitEmptyStack();

            },
            /*PlayerController.Start end.*/

            /*PlayerController.OnEnable start.*/
            OnEnable: function () {
                //Time.timeScale = 1;
            },
            /*PlayerController.OnEnable end.*/

            /*PlayerController.Update start.*/
            Update: function () {
                if (!GameManager.instance.startGame) {
                    return;
                }
                if (this.dead) {
                    return;
                }

                if (this.canShoot) {
                    this.AutoShoot();
                }

                if (UnityEngine.GameObject.op_Equality(this.closestEnemy, null)) {
                    //anim.SetBool("shoot", false);
                    this.canShoot = false;
                    this.muzzleFlash.SetActive(false);
                }

                if (UnityEngine.GameObject.op_Inequality(this.playerShield, null)) {
                    this.playerShield.transform.Rotate$2((pc.Vec3.UP.clone().scale( 200 ).scale( UnityEngine.Time.deltaTime )));
                }

                if (this.hasTripleShoot) {
                    this.tripleShootTimer -= UnityEngine.Time.deltaTime;
                    if (this.tripleShootTimer <= 0) {
                        this.hasTripleShoot = false;
                        this.tripleShootTimer = this.tripleShootTimerMax;
                    }

                }
            },
            /*PlayerController.Update end.*/

            /*PlayerController.OnDrawGizmos start.*/
            OnDrawGizmos: function () {
                UnityEngine.Gizmos.DrawWireSphere(this.transform.position.$clone(), this.range);
                UnityEngine.Gizmos.color = new pc.Color( 1, 0, 0, 1 );
            },
            /*PlayerController.OnDrawGizmos end.*/

            /*PlayerController.OnTriggerEnter start.*/
            OnTriggerEnter: function (other) {

                if (!this.dead) {

                    if (other.gameObject.CompareTag("Coin")) {
                        GameManager.instance.GiveCoin(1);
                        UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                        SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.coinPickSFX);
                    }

                    if (other.gameObject.CompareTag("enemyProjectile") && !this.hasShield) {
                        this.TakeDamage(2);

                        UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                    }
                    if (other.gameObject.CompareTag("bomb")) {
                        this.TakeDamage(20);
                        var pop = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, GameManager.instance.hitFX, this.transform.position.$clone(), pc.Quat.IDENTITY.clone());
                        pop.transform.localScale = pop.transform.localScale.$clone().scale( 2 );
                        UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                    }
                    if (other.gameObject.CompareTag("enemySniperProjectile") && !this.hasShield) {
                        this.TakeDamage(10);

                        UnityEngine.MonoBehaviour.Destroy(other.gameObject);

                        DG.Tweening.ShortcutExtensions.DOShakeRotation$2(UnityEngine.Camera.main.transform, 0.45, 1, 10, 90);
                    }

                    if (other.gameObject.CompareTag("playerShieldPickup") && !this.hasShield) {
                        this.shieldLevel = 2;
                        this.hasShield = true;
                        var shieldIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, this.shieldPrefab, this.transform.position.$clone(), this.shieldPrefab.transform.rotation.$clone());
                        shieldIns.transform.parent = this.transform;
                        this.playerShield = shieldIns;
                        UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                        SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.tripleFirePickSFX);
                    }

                    if (other.gameObject.CompareTag("TripleShootPickup") && !this.hasTripleShoot) {
                        this.hasTripleShoot = true;
                        UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                        SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.tripleFirePickSFX);
                    }

                    if (other.gameObject.CompareTag("playerHealthPickup")) {
                        if (this.health < ((this.maxHealth - 30) | 0)) {
                            this.health = (this.health + 30) | 0;
                            UnityEngine.PlayerPrefs.SetInt(this.healthKey, this.health);
                            UIManager.instance.healthBar.fillAmount = this.health / this.maxHealth;
                            UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                            SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.healthPickSFX);
                        } else {
                            this.health = this.maxHealth;
                            UnityEngine.PlayerPrefs.SetInt(this.healthKey, this.health);
                            UIManager.instance.healthBar.fillAmount = this.health / this.maxHealth;
                            UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                            SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.healthPickSFX);
                        }
                    }


                    if (other.gameObject.CompareTag("coin")) {
                        GameManager.instance.GiveCoin(10);
                        UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                        SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.coinPickSFX);
                    }

                    if (other.gameObject.CompareTag("levelendportal")) {
                        //GameManager.instance.LevelCompleteUponEnteringPortal();
                    }
                    if (other.gameObject.CompareTag("treeWood") && !this.dead) {
                        //stransform.DOLookAt(other.gameObject.transform.position, 0.2f);
                        //axeAnim.GetComponent<Animator>().SetTrigger("axeSlash");
                        this.anim.GetComponent(UnityEngine.Animator).SetTrigger$1("chop");
                        this.StartCoroutine$1(this.AxeColliderRoutine(other.gameObject));
                        this.slashFX.GetComponent(UnityEngine.ParticleSystem).Play();
                        //Destroy(other.gameObject);
                    }
                    if (other.gameObject.CompareTag("metalSource") && !this.dead) {
                        //transform.DOLookAt(other.gameObject.transform.position, 0.2f);
                        //axeAnim.GetComponent<Animator>().SetTrigger("axeSlash");
                        this.anim.GetComponent(UnityEngine.Animator).SetTrigger$1("chop");
                        this.StartCoroutine$1(this.AxeColliderRoutine(other.gameObject));
                        this.slashFX.GetComponent(UnityEngine.ParticleSystem).Play();
                        //Destroy(other.gameObject);
                    }
                }
            },
            /*PlayerController.OnTriggerEnter end.*/

            /*PlayerController.OnTriggerStay start.*/
            OnTriggerStay: function (other) {
                if (!this.dead) {
                    if (other.gameObject.CompareTag("bot")) {
                        this.closestEnemy = this.GetClosestEnemy();
                        this.enemyContact = true;
                        this.canShoot = true;
                        DG.Tweening.ShortcutExtensions.DOLookAt(this.transform, this.closestEnemy.transform.position.$clone(), 0.25);
                    }
                    if (other.gameObject.CompareTag("triggerZone") && !this.building && !this.dead) {
                        this.StartCoroutine$1(this.BuildRoutine(other.gameObject));


                    }
                }

            },
            /*PlayerController.OnTriggerStay end.*/

            /*PlayerController.BuildRoutine start.*/
            BuildRoutine: function (other) {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    buildControl,
                    $t,
                    woodLogIns,
                    conFX,
                    $t1,
                    $t2,
                    conFX2,
                    $t3,
                    $t4,
                    conFX3,
                    $t5,
                    $t6,
                    $t7,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    this.building = true;
                                        $enumerator.current = new UnityEngine.WaitForSeconds(0.125);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    //building home
                                        buildControl = other.gameObject.GetComponentInParent(BuildingController);
                                        if (buildControl.requiredWood <= GameManager.instance.totalWood) {
                                            SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.buildProcessSFX);
                                            buildControl.requiredWood = (buildControl.requiredWood - 1) | 0;
                                            //buildControl.txtReqWood.text = buildControl.requiredWood.ToString();
                                            ($t = GameManager.instance).totalWood = ($t.totalWood - 1) | 0;
                                            //UIManager.instance.txtWoodCountInGame.text = GameManager.instance.totalWood.ToString();

                                            woodLogIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, GameManager.instance.woodLogPrefab, this.transform.position.$clone(), GameManager.instance.woodLogPrefab.transform.rotation.$clone());
                                            DG.Tweening.TweenSettingsExtensions.OnComplete(DG.Tweening.Core.TweenerCore$3(UnityEngine.Vector3,UnityEngine.Vector3,DG.Tweening.Plugins.Options.VectorOptions), DG.Tweening.ShortcutExtensions.DOMove(woodLogIns.transform, other.gameObject.transform.parent.position.$clone(), 0.5), function () {
                                                UnityEngine.MonoBehaviour.Destroy(woodLogIns);
                                            });

                                            //temp solution
                                            if (buildControl.requiredWood === 15) {
                                                buildControl.buildStages[0].SetActive(true);
                                            }
                                            if (buildControl.requiredWood === 10) {
                                                buildControl.buildStages[1].SetActive(true);
                                            }
                                            if (buildControl.requiredWood === 5) {
                                                buildControl.buildStages[2].SetActive(true);
                                            }
                                            if (buildControl.requiredWood === 0) {
                                                buildControl.buildStages[3].SetActive(true);
                                                buildControl.isComplete = true;
                                            }

                                            if (buildControl.requiredWood <= 0) {
                                                //upon build completion

                                                conFX = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, ($t1 = GameManager.instance.confettiFX)[0], buildControl.transform.position.$clone(), ($t2 = GameManager.instance.confettiFX)[0].transform.rotation.$clone());
                                                this.Destroy(conFX, 10.0);
                                                conFX2 = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, ($t3 = GameManager.instance.confettiFX)[1], buildControl.transform.position.$clone(), ($t4 = GameManager.instance.confettiFX)[1].transform.rotation.$clone());
                                                this.Destroy(conFX2, 10.0);
                                                conFX3 = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, ($t5 = GameManager.instance.confettiFX)[2], buildControl.transform.position.$clone(), ($t6 = GameManager.instance.confettiFX)[2].transform.rotation.$clone());
                                                this.Destroy(conFX3, 10.0);

                                                SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.buildCompleteSFX);
                                                UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                                                buildControl.buildCanvas.SetActive(false);

                                                this.gameObject.GetComponent(LumberCraft.PlayerInputController).enabled = false;
                                                this.anim.enabled = false;
                                                for (var i = 0; i < GameManager.instance.arrows.length; i = (i + 1) | 0) {
                                                    ($t7 = GameManager.instance.arrows)[i].SetActive(false);
                                                }

                                                GameManager.instance.victory = true;
                                                GameManager.instance.botSpawner.SetActive(false);
                                                GameManager.instance.mainCam.GetComponent(CameraController).enabled = false;
                                                DG.Tweening.ShortcutExtensions.DOMove(GameManager.instance.mainCam.transform, GameManager.instance.endCamPos.transform.position.$clone(), 0.5);
                                                DG.Tweening.TweenSettingsExtensions.OnComplete(DG.Tweening.Core.TweenerCore$3(UnityEngine.Quaternion,UnityEngine.Quaternion,DG.Tweening.Plugins.Options.NoOptions), DG.Tweening.ShortcutExtensions.DORotateQuaternion(GameManager.instance.mainCam.transform, GameManager.instance.endCamPos.transform.rotation.$clone(), 0.5), function () {
                                                    if (GameManager.instance.gameOverPanelStatus === GameOverPanelStatus.on) {
                                                        UIManager.instance.gameoverWinPanel.SetActive(true);
                                                        UIManager.instance.gamePanel.SetActive(false);
                                                    } else if (GameManager.instance.gameOverPanelStatus === GameOverPanelStatus.off) {
                                                        UIManager.instance.OpenCTAPanelCallback();
                                                    }
                                                });
                                                this.enabled = false;
                                            }
                                        }
                                        this.building = false;

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*PlayerController.BuildRoutine end.*/

            /*PlayerController.OnTriggerExit start.*/
            OnTriggerExit: function (other) {
                if (!this.dead) {
                    if (other.gameObject.CompareTag("bot")) {
                        this.enemyContact = false;
                        this.canShoot = false;
                        this.muzzleFlash.SetActive(false);
                        this.anim.SetBool$1("shoot", false);
                    }
                }

            },
            /*PlayerController.OnTriggerExit end.*/

            /*PlayerController.OnCollisionEnter start.*/
            OnCollisionEnter: function (other) {
                if (!this.dead) {
                    if (other.gameObject.CompareTag("pickupWood")) {
                        GameManager.instance.GiveWood(2);
                        this.WoodStackManagement();
                        UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                    }
                    if (other.gameObject.CompareTag("pickupMetal")) {
                        //GameManager.instance.GiveWood(1);
                        //WoodStackManagement();
                        //UIManager.instance.txtWoodCountInGame.text = GameManager.instance.totalWood.ToString();
                        UnityEngine.MonoBehaviour.Destroy(other.gameObject);
                    }
                    if (other.gameObject.CompareTag("bot")) {
                        this.TakeDamage(2);
                    }
                }

            },
            /*PlayerController.OnCollisionEnter end.*/

            /*PlayerController.InitEmptyStack start.*/
            InitEmptyStack: function () {
                for (var i = 0; i < this.woodStack.length; i = (i + 1) | 0) {
                    this.woodStack[i].SetActive(false);
                }
            },
            /*PlayerController.InitEmptyStack end.*/

            /*PlayerController.WoodStackManagement start.*/
            WoodStackManagement: function () {
                var woodIndex = (Bridge.Int.div(GameManager.instance.ingameWoodCount, 5)) | 0;

                for (var i = 0; i < this.woodStack.length; i = (i + 1) | 0) {
                    if (woodIndex < this.woodStack.length) {
                        this.woodStack[woodIndex].SetActive(true);
                    }
                }

            },
            /*PlayerController.WoodStackManagement end.*/

            /*PlayerController.AxeColliderRoutine start.*/
            AxeColliderRoutine: function (x) {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    pop,
                    $t,
                    $t1,
                    treetop,
                    $t2,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new UnityEngine.WaitForSeconds(0.25);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    if (x.CompareTag("treeWood")) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 2: {
                                    //Camera.main.transform.DOShakeRotation(0.5f, 0.5f);
                                        x.transform.parent.GetComponent(TreeController).leafFX.GetComponent(UnityEngine.ParticleSystem).Play();
                                        pop = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, GameManager.instance.hitTreeFX, x.transform.position.$clone(), pc.Quat.IDENTITY.clone());
                                        this.Destroy(pop, 1.0);
                                        UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, GameManager.instance.woodPickupPrefab, x.transform.position.$clone(), GameManager.instance.woodPickupPrefab.transform.rotation.$clone());
                                        SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.GetRandomTreeCutSFX());
                                        this.axeCollider.SetActive(false);
                                        //wood health
                                        ($t = x.GetComponent(Farmable)).sourceHealth = ($t.sourceHealth - 1) | 0;
                                        if (x.GetComponent(Farmable).sourceHealth <= 0) {
                                            ($t1 = x.GetComponentInParent(TreeController)).treeHealth = ($t1.treeHealth - 1) | 0;
                                            treetop = x.GetComponentInParent(TreeController).treeTop;
                                            DG.Tweening.ShortcutExtensions.DOScaleX(treetop.transform, treetop.transform.localScale.x - 0.5, 0.1);
                                            DG.Tweening.ShortcutExtensions.DOScaleZ(treetop.transform, treetop.transform.localScale.z - 0.5, 0.1);
                                            if (x.GetComponentInParent(TreeController).treeHealth <= 0) {
                                                treetop.GetComponent(UnityEngine.BoxCollider).enabled = false;
                                            }
                                            UnityEngine.MonoBehaviour.Destroy(x);
                                        }

                                        $enumerator.current = new UnityEngine.WaitForSeconds(0.5);
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    this.axeCollider.SetActive(true);
                                    $step = 4;
                                    continue;
                                }
                                case 4: {
                                    if (x.CompareTag("metalSource")) {
                                            $step = 5;
                                            continue;
                                        } 
                                        $step = 7;
                                        continue;
                                }
                                case 5: {
                                    //Camera.main.transform.DOShakeRotation(0.5f, 0.5f);
                                        //x.transform.DOShakePosition(0.2f,0.2f);

                                        this.SpawnPickupable(x);
                                        SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.hitStoneSFX);
                                        //if (x.GetComponent<Farmable>().resourceType == ResourceType.gold)
                                        //{
                                        //    GameObject pop = Instantiate(GameManager.instance.hitGoldFX, x.transform.position, Quaternion.identity);
                                        //    Destroy(pop, 1f);
                                        //}
                                        //if (x.GetComponent<Farmable>().resourceType == ResourceType.silver)
                                        //{
                                        //    GameObject pop = Instantiate(GameManager.instance.hitSilverFX, x.transform.position, Quaternion.identity);
                                        //    Destroy(pop, 1f);
                                        //}
                                        //if (x.GetComponent<Farmable>().resourceType == ResourceType.diamond)
                                        //{
                                        //    GameObject pop = Instantiate(GameManager.instance.hitDiamondFX, x.transform.position, Quaternion.identity);
                                        //    Destroy(pop, 1f);
                                        //}
                                        this.axeCollider.SetActive(false);
                                        //source health
                                        ($t2 = x.GetComponent(Farmable)).sourceHealth = ($t2.sourceHealth - 1) | 0;
                                        if (x.GetComponent(Farmable).sourceHealth === 2) {
                                            DG.Tweening.ShortcutExtensions.DOScale$1(x.transform, new pc.Vec3( x.transform.localScale.x - 0.05, x.transform.localScale.y - 0.05, x.transform.localScale.z - 0.1 ), 0.2);
                                        }
                                        if (x.GetComponent(Farmable).sourceHealth <= 0) {
                                            this.SpawnPickupable5Stack(x);
                                            UnityEngine.MonoBehaviour.Destroy(x);
                                        }

                                        $enumerator.current = new UnityEngine.WaitForSeconds(0.5);
                                        $step = 6;
                                        return true;
                                }
                                case 6: {
                                    this.axeCollider.SetActive(true);
                                    $step = 7;
                                    continue;
                                }
                                case 7: {

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*PlayerController.AxeColliderRoutine end.*/

            /*PlayerController.SpawnPickupable start.*/
            SpawnPickupable: function (x) {
                var $t, $t1, $t2, $t3, $t4, $t5;
                if (x.GetComponent(Farmable).resourceType === ResourceType.gold) {
                    var goldIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, ($t = GameManager.instance.resourcePickupPrefabs)[0], x.transform.position.$clone(), ($t1 = GameManager.instance.resourcePickupPrefabs)[0].transform.rotation.$clone());
                    DG.Tweening.ShortcutExtensions.DOMoveY(goldIns.transform, goldIns.transform.position.y + 4, 0.2);
                }
                if (x.GetComponent(Farmable).resourceType === ResourceType.silver) {
                    var silverIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, ($t2 = GameManager.instance.resourcePickupPrefabs)[1], x.transform.position.$clone(), ($t3 = GameManager.instance.resourcePickupPrefabs)[1].transform.rotation.$clone());
                    DG.Tweening.ShortcutExtensions.DOMoveY(silverIns.transform, silverIns.transform.position.y + 4, 0.2);
                }
                if (x.GetComponent(Farmable).resourceType === ResourceType.diamond) {
                    var diamIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, ($t4 = GameManager.instance.resourcePickupPrefabs)[2], x.transform.position.$clone(), ($t5 = GameManager.instance.resourcePickupPrefabs)[2].transform.rotation.$clone());
                    DG.Tweening.ShortcutExtensions.DOMoveY(diamIns.transform, diamIns.transform.position.y + 4, 0.2);
                }
            },
            /*PlayerController.SpawnPickupable end.*/

            /*PlayerController.SpawnPickupable5Stack start.*/
            SpawnPickupable5Stack: function (x) {
                var $t, $t1, $t2, $t3, $t4, $t5;
                if (x.GetComponent(Farmable).resourceType === ResourceType.gold) {
                    var goldIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, ($t = GameManager.instance.resourcePickup5StacksPrefabs)[0], x.transform.position.$clone(), ($t1 = GameManager.instance.resourcePickup5StacksPrefabs)[0].transform.rotation.$clone());
                    DG.Tweening.ShortcutExtensions.DOMoveY(goldIns.transform, goldIns.transform.position.y + 4, 0.2);
                }
                if (x.GetComponent(Farmable).resourceType === ResourceType.silver) {
                    var silverIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, ($t2 = GameManager.instance.resourcePickup5StacksPrefabs)[1], x.transform.position.$clone(), ($t3 = GameManager.instance.resourcePickup5StacksPrefabs)[1].transform.rotation.$clone());
                    DG.Tweening.ShortcutExtensions.DOMoveY(silverIns.transform, silverIns.transform.position.y + 4, 0.2);
                }
                if (x.GetComponent(Farmable).resourceType === ResourceType.diamond) {
                    var diamIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, ($t4 = GameManager.instance.resourcePickup5StacksPrefabs)[2], x.transform.position.$clone(), ($t5 = GameManager.instance.resourcePickup5StacksPrefabs)[2].transform.rotation.$clone());
                    DG.Tweening.ShortcutExtensions.DOMoveY(diamIns.transform, diamIns.transform.position.y + 4, 0.2);
                }
            },
            /*PlayerController.SpawnPickupable5Stack end.*/

            /*PlayerController.AutoShoot start.*/
            AutoShoot: function () {
                this.shootDelay += UnityEngine.Time.deltaTime;
                if (this.shootDelay >= this.shootDelayMax && !this.dead) {
                    this.anim.SetBool$1("shoot", true);
                    this.muzzleFlash.SetActive(true);


                    var bshellIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, this.bulletShellPrefab, this.shellPoint.position.$clone(), this.shellPoint.rotation.$clone());
                    //bshellIns.GetComponent<Rigidbody>().AddExplosionForce(100f,Vector3.right * 50,50,50,ForceMode.Impulse);
                    this.Destroy(bshellIns, 1.5);
                    this.shootDelay = 0;

                    SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.GetRandomShootSFX());

                    //triple shoot power up
                    if (this.hasTripleShoot) {
                        var bulletDRIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, this.bulletForTrippleShoot, this.firePoints[0].position.$clone(), this.firePoints[0].rotation.$clone());
                        this.Destroy(bulletDRIns, 3.0);
                        var bulletDRInss = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, this.bulletForTrippleShoot, this.firePoints[1].position.$clone(), this.firePoints[1].rotation.$clone());
                        this.Destroy(bulletDRInss, 3.0);
                        var bulletDLIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, this.bulletForTrippleShoot, this.firePoints[2].position.$clone(), this.firePoints[2].rotation.$clone());
                        this.Destroy(bulletDLIns, 3.0);
                    } else {
                        var bulletIns = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, this.bullet, this.firePoints[0].position.$clone(), this.firePoints[0].rotation.$clone());
                        this.Destroy(bulletIns, 3.0);
                        var b = bulletIns.GetComponent(PlayerBullet);

                        if (UnityEngine.MonoBehaviour.op_Inequality(b, null)) {
                            b.GetTarget(this.target);
                        }
                    }

                }
            },
            /*PlayerController.AutoShoot end.*/

            /*PlayerController.GetClosestEnemy start.*/
            GetClosestEnemy: function () {
                var $t;
                this.enemies = UnityEngine.GameObject.FindGameObjectsWithTag("bot");
                var closestDistance = window.Infinity;
                var tran = null;

                $t = Bridge.getEnumerator(this.enemies);
                try {
                    while ($t.moveNext()) {
                        var go = $t.Current;
                        var currentDistance;
                        currentDistance = pc.Vec3.distance( this.transform.position, go.transform.position );
                        if (currentDistance < closestDistance) {
                            closestDistance = currentDistance;
                            tran = go;

                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                if (UnityEngine.GameObject.op_Inequality(tran, null) && closestDistance <= this.range) {
                    this.target = tran.transform;
                } else {
                    this.target = null;
                }

                return tran;
            },
            /*PlayerController.GetClosestEnemy end.*/

            /*PlayerController.TakeDamage start.*/
            TakeDamage: function (dmg) {
                this.health = (this.health - dmg) | 0;
                UnityEngine.PlayerPrefs.SetInt(this.healthKey, this.health);
                UIManager.instance.healthBar.fillAmount = this.health / this.maxHealth;
                if (this.health <= 0) {
                    this.PlayerDeath();
                }

                var dmgPop = UnityEngine.Object.Instantiate$2(UnityEngine.GameObject, GameManager.instance.dmgTextPopupPrefab, this.transform.position.$clone(), pc.Quat.IDENTITY.clone());
                dmgPop.transform.GetComponent(TMPro.TextMeshPro).text = "-" + Bridge.Int.mul(dmg, 10);
                //dmgPop.transform.GetComponent<TextMeshPro>().DOFade(50, .3f);
                DG.Tweening.ShortcutExtensions.DOMoveY(dmgPop.transform, dmgPop.transform.position.y + 2, 0.3);
                this.Destroy(dmgPop, 0.3);
            },
            /*PlayerController.TakeDamage end.*/

            /*PlayerController.PlayerDeath start.*/
            PlayerDeath: function () {
                SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.loseSFX);
                this.anim.SetTrigger$1("die");
                this.dead = true;
                //StartCoroutine(AnimOffRoutine());

                this.woodStackParent.SetActive(false);

                this.enabled = false;
                this.gameObject.GetComponent(LumberCraft.PlayerInputController).enabled = false;
                //myAgent.enabled = false;
                this.muzzleFlash.SetActive(false);
                if (GameManager.instance.gameOverPanelStatus === GameOverPanelStatus.on) {
                    UIManager.instance.gameoverLosePanel.SetActive(true);
                    UIManager.instance.gamePanel.SetActive(false);
                } else if (GameManager.instance.gameOverPanelStatus === GameOverPanelStatus.off) {
                    UIManager.instance.OpenCTAPanelCallback();
                }
                this.rb.isKinematic = true;

            },
            /*PlayerController.PlayerDeath end.*/

            /*PlayerController.CompleteLevel start.*/
            CompleteLevel: function () {
                this.anim.SetTrigger$1("die");
                this.dead = true;
                this.enabled = false;
                //myAgent.enabled = false;
                this.rb.isKinematic = true;
                this.muzzleFlash.SetActive(false);
                UIManager.instance.gamePanel.SetActive(false);
                UIManager.instance.levelCompletePanel.SetActive(true);
            },
            /*PlayerController.CompleteLevel end.*/

            /*PlayerController.GetPlayerHealth start.*/
            GetPlayerHealth: function () {
                //health = PlayerPrefs.GetInt(healthKey, maxHealth);
                this.health = this.maxHealth;
                UIManager.instance.healthBar.fillAmount = this.health / this.maxHealth;
            },
            /*PlayerController.GetPlayerHealth end.*/

            /*PlayerController.AnimOffRoutine start.*/
            AnimOffRoutine: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new UnityEngine.WaitForSeconds(1.1);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.anim.enabled = false;
                                        this.gameObject.GetComponentInChildren(UnityEngine.Animator).enabled = false;
                                        //Time.timeScale = 0;

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*PlayerController.AnimOffRoutine end.*/


        }
    });
    /*PlayerController end.*/

    /*ResourceStatus start.*/
    Bridge.define("ResourceStatus", {
        $kind: "enum",
        statics: {
            fields: {
                source: 0,
                pickup: 1
            }
        }
    });
    /*ResourceStatus end.*/

    /*ResourceType start.*/
    Bridge.define("ResourceType", {
        $kind: "enum",
        statics: {
            fields: {
                wood: 0,
                gold: 1,
                silver: 2,
                diamond: 3
            }
        }
    });
    /*ResourceType end.*/

    /*SharkWorldItem start.*/
    Bridge.define("SharkWorldItem", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            sharkWorldPanel: null,
            btnEquip: null,
            imgProdImage: null,
            lockImage: null,
            txtWorldName: null,
            worldId: 0,
            currentLevel: 0,
            progressItems: null
        },
        methods: {
            /*SharkWorldItem.Initialize start.*/
            Initialize: function (id, CurrentLevel, psw, worldImage, worldName) {
                this.sharkWorldPanel = psw;
                this.worldId = id;
                this.currentLevel = CurrentLevel;
                this.AddListener();
                this.imgProdImage.sprite = worldImage;
                this.txtWorldName.text = worldName;
                //image
                //object
            },
            /*SharkWorldItem.Initialize end.*/

            /*SharkWorldItem.AddListener start.*/
            AddListener: function () {
                this.btnEquip.onClick.AddListener(Bridge.fn.bind(this, function () {
                    this.GotToWorld();
                }));


            },
            /*SharkWorldItem.AddListener end.*/

            /*SharkWorldItem.AddProgressItem start.*/
            AddProgressItem: function (progressItem) {
                this.progressItems.add(progressItem);

            },
            /*SharkWorldItem.AddProgressItem end.*/

            /*SharkWorldItem.getallProgressItem start.*/
            getallProgressItem: function () {
                return this.progressItems;

            },
            /*SharkWorldItem.getallProgressItem end.*/

            /*SharkWorldItem.GotToWorld start.*/
            GotToWorld: function () {
                if ((UnityEngine.PlayerPrefs.HasKey("worldKey") ? UnityEngine.PlayerPrefs.GetInt("worldKey") : 0) !== this.worldId) {
                    //SoundManager.SharedManager().PlaySFX(SoundManager.SharedManager().TapButton);
                    UnityEngine.PlayerPrefs.SetInt("worldKey", this.worldId);
                    GameManager.instance.worldID = this.worldId;

                    UnityEngine.PlayerPrefs.SetInt("gamelevelKey", (((Bridge.Int.mul(this.worldId, 9)) + UnityEngine.PlayerPrefs.GetInt("levelCountWorld" + this.worldId)) | 0));
                    GameManager.instance.gameLevel = ((Bridge.Int.mul(this.worldId, 9)) + UnityEngine.PlayerPrefs.GetInt("levelCountWorld" + this.worldId)) | 0;

                    UnityEngine.PlayerPrefs.SetInt("levelKey", GameManager.instance.gameLevel % 9);
                    GameManager.instance.levelID = GameManager.instance.gameLevel % 9;

                    UIManager.instance.UpdateWorldUI(this.worldId);

                    UnityEngine.Debug.Log$1("currentLevel =" + UnityEngine.PlayerPrefs.GetInt("gamelevelKey"));
                }

                //Destroy(sharkWorldPanel.gameObject);
                UnityEngine.Debug.Log$1("goto world number ........" + this.worldId);

                //GameManager.instance.SetCurrentWorld();
                UIManager.instance.UpdateWorldUI(this.worldId);
                this.sharkWorldPanel.gameObject.SetActive(false);
                UIManager.instance.HomeCallback();
            },
            /*SharkWorldItem.GotToWorld end.*/


        }
    });
    /*SharkWorldItem end.*/

    /*SharkWorldProgressItem start.*/
    Bridge.define("SharkWorldProgressItem", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            myWorld: null,
            txtClearLevel: null,
            txtProgress: null,
            txtRewardAmount1: null,
            txtRewardAmount2: null,
            imgItem1: null,
            imgItem2: null,
            imgFillImage: null,
            btnClick: null,
            clamiedImg: null,
            rewardAmount1: 0,
            rewardAmount2: 0,
            clearedRoom: 0,
            currentProgress: 0,
            targetProgress: 0,
            fillValue: 0,
            sprite1: null,
            sprite2: null,
            worldId: 0,
            progressId: 0,
            currentLevel: 0
        },
        methods: {
            /*SharkWorldProgressItem.Start start.*/
            Start: function () {

            },
            /*SharkWorldProgressItem.Start end.*/

            /*SharkWorldProgressItem.init start.*/
            init: function (world, WorldId, ProgressId, CurrentLevel, reward1) {
                this.myWorld = world;
                this.worldId = WorldId;
                this.progressId = ProgressId;
                this.currentLevel = CurrentLevel;
                this.btnClick.onClick.AddListener(Bridge.fn.bind(this, function () {
                    this.btnClickCallback();
                }));

                this.rewardAmount1 = reward1;
                //reward set
                //AssignRewardImage(sprite1, sprite2);
                this.AssignRewardValue(this.rewardAmount1, this.rewardAmount2);

                //progress set
                this.targetProgress = Bridge.Int.mul((((ProgressId + 1) | 0)), 3);
                this.currentProgress = (this.currentLevel - (Bridge.Int.mul(this.worldId, 9))) | 0;
                if (this.currentProgress > this.targetProgress) {
                    this.currentProgress = this.targetProgress;
                } else if (this.currentProgress < this.targetProgress) {
                    this.clamiedImg.SetActive(false);
                }

                if (this.currentProgress < 0) {
                    this.currentProgress = 0;
                }

                this.SetTxtProgress(this.currentProgress, this.targetProgress);

                //progress fill set
                this.fillValue = (this.currentProgress * 1.0 / this.targetProgress);

                this.SetImgFillImageFill(this.fillValue);

                //room no set
                this.clearedRoom = this.progressId;
                this.SetTxtClearRoom(this.clearedRoom);

                return this;

            },
            /*SharkWorldProgressItem.init end.*/

            /*SharkWorldProgressItem.SetImgFillImageFill start.*/
            SetImgFillImageFill: function (Fillvalue) {

                this.imgFillImage.fillAmount = Fillvalue;
            },
            /*SharkWorldProgressItem.SetImgFillImageFill end.*/

            /*SharkWorldProgressItem.AssignRewardImage start.*/
            AssignRewardImage: function (sprt1, sprt2) {
                this.imgItem1.sprite = sprt1;
                this.imgItem2.sprite = sprt2;

            },
            /*SharkWorldProgressItem.AssignRewardImage end.*/

            /*SharkWorldProgressItem.AssignRewardValue start.*/
            AssignRewardValue: function (RewardAmount1, RewardAmount2) {
                this.txtRewardAmount1.text = Bridge.toString(RewardAmount1);
                this.txtRewardAmount2.text = Bridge.toString(RewardAmount2);

            },
            /*SharkWorldProgressItem.AssignRewardValue end.*/

            /*SharkWorldProgressItem.SetTxtProgress start.*/
            SetTxtProgress: function (current, target) {
                this.txtProgress.text = "PROGRESS " + current + "/" + target;

            },
            /*SharkWorldProgressItem.SetTxtProgress end.*/

            /*SharkWorldProgressItem.SetTxtClearRoom start.*/
            SetTxtClearRoom: function (clearedroom) {
                this.txtClearLevel.text = "CLEAR ROOM " + clearedroom;
            },
            /*SharkWorldProgressItem.SetTxtClearRoom end.*/

            /*SharkWorldProgressItem.btnClickCallback start.*/
            btnClickCallback: function () {
                UnityEngine.Debug.Log$1("clicked");
            },
            /*SharkWorldProgressItem.btnClickCallback end.*/


        }
    });
    /*SharkWorldProgressItem end.*/

    /*SoundManager start.*/
    Bridge.define("SoundManager", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                sharedInstance: null
            },
            methods: {
                /*SoundManager.SharedManager:static start.*/
                SharedManager: function () {
                    return SoundManager.sharedInstance;
                },
                /*SoundManager.SharedManager:static end.*/


            }
        },
        fields: {
            sfxAuidoSource: null,
            backgroundAudioSource: null,
            soundOn: false,
            shootSFX: null,
            botKillSFX: null,
            sniperShotSFX: null,
            enemyShootSFX: null,
            enemyCloneSFX: null,
            coinPickSFX: null,
            healthPickSFX: null,
            tripleFirePickSFX: null,
            portalSFX: null,
            footstepSFX: null,
            buildProcessSFX: null,
            buildCompleteSFX: null,
            treeCutSFX: null,
            hitStoneSFX: null,
            loseSFX: null
        },
        methods: {
            /*SoundManager.Awake start.*/
            Awake: function () {
                if (UnityEngine.MonoBehaviour.op_Equality(SoundManager.sharedInstance, null)) {
                    SoundManager.sharedInstance = this;
                } else {
                    UnityEngine.MonoBehaviour.Destroy(this.gameObject);
                }

            },
            /*SoundManager.Awake end.*/

            /*SoundManager.Start start.*/
            Start: function () {
                this.soundOn = true;
                this.sfxAuidoSource = this.GetComponent(UnityEngine.AudioSource);

                //backgroundAudioSource =  GetComponent<AudioSource>();

                //if (backgroundAudioSource != null)
                this.PlayMainMenuAudio();
            },
            /*SoundManager.Start end.*/

            /*SoundManager.PlaySFX start.*/
            PlaySFX: function (audioClip) {
                this.sfxAuidoSource.PlayOneShot(audioClip);
            },
            /*SoundManager.PlaySFX end.*/

            /*SoundManager.PlayMainMenuAudio start.*/
            PlayMainMenuAudio: function () {
                this.backgroundAudioSource.gameObject.SetActive(true);
            },
            /*SoundManager.PlayMainMenuAudio end.*/

            /*SoundManager.StopMainMenuAudio start.*/
            StopMainMenuAudio: function () {
                this.backgroundAudioSource.gameObject.SetActive(false);
            },
            /*SoundManager.StopMainMenuAudio end.*/

            /*SoundManager.GetRandomShootSFX start.*/
            GetRandomShootSFX: function () {
                return this.shootSFX.getItem(UnityEngine.Random.Range(0, this.shootSFX.Count));
            },
            /*SoundManager.GetRandomShootSFX end.*/

            /*SoundManager.GetRandomBotkillSFX start.*/
            GetRandomBotkillSFX: function () {
                return this.botKillSFX.getItem(UnityEngine.Random.Range(0, this.botKillSFX.Count));
            },
            /*SoundManager.GetRandomBotkillSFX end.*/

            /*SoundManager.GetRandomTreeCutSFX start.*/
            GetRandomTreeCutSFX: function () {
                return this.treeCutSFX.getItem(UnityEngine.Random.Range(0, this.treeCutSFX.Count));
            },
            /*SoundManager.GetRandomTreeCutSFX end.*/


        }
    });
    /*SoundManager end.*/

    /*TreeController start.*/
    Bridge.define("TreeController", {
        inherits: [UnityEngine.MonoBehaviour],
        fields: {
            treeHealth: 0,
            leafFX: null,
            treeTop: null
        },
        methods: {
            /*TreeController.Start start.*/
            Start: function () {

            },
            /*TreeController.Start end.*/

            /*TreeController.Update start.*/
            Update: function () {

            },
            /*TreeController.Update end.*/

            /*TreeController.OnCollisionEnter start.*/
            OnCollisionEnter: function (other) {
                if (other.gameObject.CompareTag("ground")) {
                    DG.Tweening.ShortcutExtensions.DOMoveY(this.treeTop.transform, -0.6, 0.5);
                }
            },
            /*TreeController.OnCollisionEnter end.*/


        }
    });
    /*TreeController end.*/

    /*UiCart start.*/
    Bridge.define("UiCart", {
        $kind: "enum",
        statics: {
            fields: {
                old_ui: 0,
                new_ui: 1
            }
        }
    });
    /*UiCart end.*/

    /*UIManager start.*/
    Bridge.define("UIManager", {
        inherits: [UnityEngine.MonoBehaviour],
        statics: {
            fields: {
                instance: null
            }
        },
        fields: {
            panelCTA: null,
            btnDownload: null,
            isLunaGamEndCalled: false,
            gamePanel: null,
            gameOverPanel: null,
            levelCompletePanel: null,
            retryBtn: null,
            nextBtn: null,
            homeBtn: null,
            retryHomeBtn: null,
            gameoverLosePanel: null,
            gameoverWinPanel: null,
            btnLoseNext: null,
            btnWinNext: null,
            healthBar: null,
            levelProgBar: null,
            startPanel: null,
            playBtn: null,
            txtLevel: null,
            txtWorld: null,
            txtCoin: null,
            txtWood: null,
            txtHowtoPlay: null,
            howtoPlayTapped: false,
            txtLevelGamePanel: null,
            txtWorldGamePanel: null,
            txtWoodCountInGame: null,
            tutorial: null,
            sharkWorldPanel: null,
            sharkWorldBtn: null,
            UICanvas: null,
            worldImages: null,
            imgProdImage: null,
            txtWorldName: null,
            WorldName: null
        },
        ctors: {
            init: function () {
                this.WorldName = System.Array.init(["Enchanted Forest", "Forgotten Land", "Death Valley", "Waste Land", "Middgard", "Silent Forest", "Spirit Hill", "Westerworld", "Badlands", "Hell Forest"], System.String);
            }
        },
        methods: {
            /*UIManager.Awake start.*/
            Awake: function () {
                UIManager.instance = this;
                this.playBtn.onClick.AddListener(Bridge.fn.bind(this, function () {
                    this.PlayBtnCallback();
                }));
                //retryBtn.onClick.AddListener(() => RetryBtnCallback());
                //nextBtn.onClick.AddListener(() => NextBtnCallback());
            },
            /*UIManager.Awake end.*/

            /*UIManager.Start start.*/
            Start: function () {
                this.InGameProgressionText();
                GameManager.instance.startGame = true;
                SoundManager.sharedInstance.StopMainMenuAudio();
                this.btnDownload.onClick.AddListener(Bridge.fn.bind(this, function () {
                    this.InstallFullGameCallback();
                }));
                this.btnLoseNext.onClick.AddListener(Bridge.fn.bind(this, function () {
                    this.OpenCTAPanelCallback();
                }));
                this.btnWinNext.onClick.AddListener(Bridge.fn.bind(this, function () {
                    this.OpenCTAPanelCallback();
                }));
            },
            /*UIManager.Start end.*/

            /*UIManager.PlayBtnCallback start.*/
            PlayBtnCallback: function () {
                GameManager.instance.SetCurrentWorld();
                BotSpawner.instance.SpawnTimerController();
                this.startPanel.SetActive(false);
                this.gamePanel.SetActive(true);
                GameManager.instance.startGame = true;
                SoundManager.sharedInstance.StopMainMenuAudio();
                this.InGameProgressionText();
                this.txtWoodCountInGame.text = Bridge.toString(GameManager.instance.totalWood);
                //GameManager.instance.portalFX.transform.DOScale();
            },
            /*UIManager.PlayBtnCallback end.*/

            /*UIManager.RetryBtnCallback start.*/
            RetryBtnCallback: function () {
                UnityEngine.PlayerPrefs.SetInt("Home", 0);
                UnityEngine.SceneManagement.SceneManager.LoadScene$2("GameScene");
            },
            /*UIManager.RetryBtnCallback end.*/

            /*UIManager.NextBtnCallback start.*/
            NextBtnCallback: function () {
                UnityEngine.PlayerPrefs.SetInt("Home", 0);
                UnityEngine.SceneManagement.SceneManager.LoadScene$2("GameScene");
            },
            /*UIManager.NextBtnCallback end.*/

            /*UIManager.HomeBtnCallback start.*/
            HomeBtnCallback: function () {
                UnityEngine.PlayerPrefs.SetInt("Home", 1);
                UnityEngine.SceneManagement.SceneManager.LoadScene$2("GameScene");
            },
            /*UIManager.HomeBtnCallback end.*/

            /*UIManager.WorldsBtnCallback start.*/
            WorldsBtnCallback: function () {

                this.sharkWorldPanel.SetActive(true);
                this.startPanel.SetActive(false);

            },
            /*UIManager.WorldsBtnCallback end.*/

            /*UIManager.HomeCallback start.*/
            HomeCallback: function () {
                //PlayerPrefs.SetInt("Home", 1);
                this.startPanel.SetActive(true);
            },
            /*UIManager.HomeCallback end.*/

            /*UIManager.UpdateWorldUI start.*/
            UpdateWorldUI: function (worldId) {
                this.txtLevel.text = "Level- " + (Bridge.toString((((GameManager.instance.levelID + 1) | 0))) || "");
                this.txtWorld.text = "World- " + (Bridge.toString((((GameManager.instance.worldID + 1) | 0))) || "");

                this.txtLevelGamePanel.text = "Level- " + (Bridge.toString((((GameManager.instance.levelID + 1) | 0))) || "");
                this.txtLevelGamePanel.text = "World- " + (Bridge.toString((((GameManager.instance.worldID + 1) | 0))) || "");

                this.imgProdImage.sprite = this.worldImages.getItem(worldId);
                this.txtWorldName.text = this.WorldName[worldId];
                //Debug.Log("level "+GameManager.instance.levelID);
            },
            /*UIManager.UpdateWorldUI end.*/

            /*UIManager.InGameProgressionText start.*/
            InGameProgressionText: function () {
                this.txtLevelGamePanel.text = "Level- " + (Bridge.toString((((GameManager.instance.levelID + 1) | 0))) || "");
                this.txtWorldGamePanel.text = "World- " + (Bridge.toString((((GameManager.instance.worldID + 1) | 0))) || "");
            },
            /*UIManager.InGameProgressionText end.*/

            /*UIManager.GameOverPanelDelayRoutine start.*/
            GameOverPanelDelayRoutine: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = new UnityEngine.WaitForSeconds(1.5);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.gameOverPanel.SetActive(true);

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            /*UIManager.GameOverPanelDelayRoutine end.*/

            /*UIManager.OpenCTAPanelCallback start.*/
            OpenCTAPanelCallback: function () {

                Luna.Unity.Playable.InstallFullGame();

                if (!this.isLunaGamEndCalled) {
                    Luna.Unity.LifeCycle.GameEnded();
                    this.isLunaGamEndCalled = true;
                }

                this.panelCTA.SetActive(true);
                this.gamePanel.SetActive(false);
                this.gameoverLosePanel.SetActive(false);
                this.gameoverWinPanel.SetActive(false);
            },
            /*UIManager.OpenCTAPanelCallback end.*/

            /*UIManager.InstallFullGameCallback start.*/
            InstallFullGameCallback: function () {

                Luna.Unity.Playable.InstallFullGame();
            },
            /*UIManager.InstallFullGameCallback end.*/


        }
    });
    /*UIManager end.*/

    var $m = Bridge.setMetadata,
        $n = ["UnityEngine","System","System.Collections","System.Collections.Generic","UnityEngine.UI","TMPro","UnityEngine.Audio","DG.Tweening.Core","DG.Tweening","DG.Tweening.Plugins.Core.PathCore","System.Globalization","DG.Tweening.Plugins.Options"];

    /*BombController start.*/
    $m("BombController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnTriggerEnter","t":8,"pi":[{"n":"other","pt":$n[0].Collider,"ps":0}],"sn":"OnTriggerEnter","rt":$n[1].Void,"p":[$n[0].Collider]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"rb","t":4,"rt":$n[0].Rigidbody,"sn":"rb"},{"a":2,"n":"speed","t":4,"rt":$n[1].Single,"sn":"speed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"upForce","t":4,"rt":$n[1].Single,"sn":"upForce","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*BombController end.*/

    /*botClass start.*/
    $m("botClass", function () { return {"att":257,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"bomber","is":true,"t":4,"rt":botClass,"sn":"bomber","box":function ($v) { return Bridge.box($v, botClass, System.Enum.toStringFn(botClass));}},{"a":2,"n":"cloner","is":true,"t":4,"rt":botClass,"sn":"cloner","box":function ($v) { return Bridge.box($v, botClass, System.Enum.toStringFn(botClass));}},{"a":2,"n":"follower","is":true,"t":4,"rt":botClass,"sn":"follower","box":function ($v) { return Bridge.box($v, botClass, System.Enum.toStringFn(botClass));}},{"a":2,"n":"shooter","is":true,"t":4,"rt":botClass,"sn":"shooter","box":function ($v) { return Bridge.box($v, botClass, System.Enum.toStringFn(botClass));}},{"a":2,"n":"shooter4Dir","is":true,"t":4,"rt":botClass,"sn":"shooter4Dir","box":function ($v) { return Bridge.box($v, botClass, System.Enum.toStringFn(botClass));}},{"a":2,"n":"sniper","is":true,"t":4,"rt":botClass,"sn":"sniper","box":function ($v) { return Bridge.box($v, botClass, System.Enum.toStringFn(botClass));}}]}; }, $n);
    /*botClass end.*/

    /*BotController start.*/
    $m("BotController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"BombPlayer","t":8,"sn":"BombPlayer","rt":$n[1].Void},{"a":2,"n":"Death","t":8,"sn":"Death","rt":$n[1].Void},{"a":1,"n":"FaceTarget","t":8,"sn":"FaceTarget","rt":$n[1].Void},{"a":2,"n":"GiveDamage","t":8,"sn":"GiveDamage","rt":$n[1].Void},{"a":1,"n":"HitPlayerRoutine","t":8,"sn":"HitPlayerRoutine","rt":$n[2].IEnumerator},{"a":1,"n":"OnDrawGizmosSelected","t":8,"sn":"OnDrawGizmosSelected","rt":$n[1].Void},{"a":1,"n":"OnTriggerEnter","t":8,"pi":[{"n":"other","pt":$n[0].Collider,"ps":0}],"sn":"OnTriggerEnter","rt":$n[1].Void,"p":[$n[0].Collider]},{"a":2,"n":"ShootPlayer","t":8,"sn":"ShootPlayer","rt":$n[1].Void},{"a":2,"n":"SnipePlayer","t":8,"sn":"SnipePlayer","rt":$n[1].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"attacked","t":4,"rt":$n[1].Boolean,"sn":"attacked","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"bc","t":4,"rt":botClass,"sn":"bc","box":function ($v) { return Bridge.box($v, botClass, System.Enum.toStringFn(botClass));}},{"a":2,"n":"bombDelay","t":4,"rt":$n[1].Single,"sn":"bombDelay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"bombDelayMax","t":4,"rt":$n[1].Single,"sn":"bombDelayMax","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("bomber")],"a":2,"n":"bombPrefab","t":4,"rt":$n[0].GameObject,"sn":"bombPrefab"},{"a":2,"n":"bombRadius","t":4,"rt":$n[1].Single,"sn":"bombRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"bulletTypes","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"bulletTypes"},{"a":2,"n":"canAttack","t":4,"rt":$n[1].Boolean,"sn":"canAttack","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.HeaderAttribute("cloner")],"a":2,"n":"cloneLevel","t":4,"rt":$n[1].Int32,"sn":"cloneLevel","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"damage","t":4,"rt":$n[1].Array.type(System.Int32),"sn":"damage"},{"a":2,"n":"dead","t":4,"rt":$n[1].Boolean,"sn":"dead","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.HeaderAttribute("shooter")],"a":2,"n":"firePoint","t":4,"rt":$n[0].Transform,"sn":"firePoint"},{"a":2,"n":"health","t":4,"rt":$n[1].Int32,"sn":"health","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"lookRadius","t":4,"rt":$n[1].Single,"sn":"lookRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"moveSpeed","t":4,"rt":$n[1].Single,"sn":"moveSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HeaderAttribute("sniper")],"a":2,"n":"ray","t":4,"rt":$n[0].GameObject,"sn":"ray"},{"a":1,"n":"rb","t":4,"rt":$n[0].Rigidbody,"sn":"rb"},{"a":2,"n":"shootDelay","t":4,"rt":$n[1].Single,"sn":"shootDelay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"shootDelayMax","t":4,"rt":$n[1].Single,"sn":"shootDelayMax","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"shootRadius","t":4,"rt":$n[1].Single,"sn":"shootRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"target","t":4,"rt":$n[0].Transform,"sn":"target"}]}; }, $n);
    /*BotController end.*/

    /*BotSpawner start.*/
    $m("BotSpawner", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[1].Void},{"a":1,"n":"EffectOffEnemy","t":8,"pi":[{"n":"go","pt":$n[0].GameObject,"ps":0}],"sn":"EffectOffEnemy","rt":$n[2].IEnumerator,"p":[$n[0].GameObject]},{"a":2,"n":"SpawnTimerController","t":8,"sn":"SpawnTimerController","rt":$n[1].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"UniqueRandomNumber","t":8,"pi":[{"n":"startNo","pt":$n[1].Int32,"ps":0},{"n":"size","pt":$n[1].Int32,"ps":1}],"sn":"UniqueRandomNumber","rt":$n[1].Array.type(System.Int32),"p":[$n[1].Int32,$n[1].Int32]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"adjustvalue","t":4,"rt":$n[1].Single,"sn":"adjustvalue","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"clonerMat","t":4,"rt":$n[0].Material,"sn":"clonerMat"},{"a":1,"n":"counter","t":4,"rt":$n[1].Int32,"sn":"counter","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"downvalue","t":4,"rt":$n[1].Single,"sn":"downvalue","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"enemy","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"enemy"},{"a":2,"n":"enemyCount","t":4,"rt":$n[1].Int32,"sn":"enemyCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"enemyCountMax","t":4,"rt":$n[1].Int32,"sn":"enemyCountMax","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"enemyPosRandom","t":4,"rt":$n[1].Array.type(System.Int32),"sn":"enemyPosRandom"},{"a":2,"n":"enemySpawnPoint","t":4,"rt":System.Array.type(UnityEngine.Transform),"sn":"enemySpawnPoint"},{"a":2,"n":"enemy_cloner","t":4,"rt":$n[0].GameObject,"sn":"enemy_cloner"},{"a":2,"n":"instance","is":true,"t":4,"rt":BotSpawner,"sn":"instance"},{"a":2,"n":"possibleLimit","is":true,"t":4,"rt":$n[1].Int32,"sn":"possibleLimit","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"sec","t":4,"rt":$n[1].Single,"sn":"sec","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"spawnTime","t":4,"rt":$n[1].Single,"sn":"spawnTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"spawnTimeMax","t":4,"rt":$n[1].Single,"sn":"spawnTimeMax","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"upduration","t":4,"rt":$n[1].Single,"sn":"upduration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*BotSpawner end.*/

    /*BulletController start.*/
    $m("BulletController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnTriggerEnter","t":8,"pi":[{"n":"other","pt":$n[0].Collider,"ps":0}],"sn":"OnTriggerEnter","rt":$n[1].Void,"p":[$n[0].Collider]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"speed","t":4,"rt":$n[1].Single,"sn":"speed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*BulletController end.*/

    /*CameraController start.*/
    $m("CameraController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[1].Void},{"a":1,"n":"LateUpdate","t":8,"sn":"LateUpdate","rt":$n[1].Void},{"a":2,"n":"SharedManager","is":true,"t":8,"sn":"SharedManager","rt":CameraController},{"a":2,"n":"Instance","is":true,"t":4,"rt":CameraController,"sn":"Instance"},{"a":1,"n":"isTargetFound","t":4,"rt":$n[1].Boolean,"sn":"isTargetFound","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"offset","t":4,"rt":$n[0].Vector3,"sn":"offset"},{"a":2,"n":"smoothFactor","t":4,"rt":$n[1].Single,"sn":"smoothFactor","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"target","t":4,"rt":$n[0].Transform,"sn":"target"}]}; }, $n);
    /*CameraController end.*/

    /*GameOverPanelStatus start.*/
    $m("GameOverPanelStatus", function () { return {"att":257,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"off","is":true,"t":4,"rt":GameOverPanelStatus,"sn":"off","box":function ($v) { return Bridge.box($v, GameOverPanelStatus, System.Enum.toStringFn(GameOverPanelStatus));}},{"a":2,"n":"on","is":true,"t":4,"rt":GameOverPanelStatus,"sn":"on","box":function ($v) { return Bridge.box($v, GameOverPanelStatus, System.Enum.toStringFn(GameOverPanelStatus));}}]}; }, $n);
    /*GameOverPanelStatus end.*/

    /*Difficulty start.*/
    $m("Difficulty", function () { return {"att":257,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"easy","is":true,"t":4,"rt":Difficulty,"sn":"easy","box":function ($v) { return Bridge.box($v, Difficulty, System.Enum.toStringFn(Difficulty));}},{"a":2,"n":"hard","is":true,"t":4,"rt":Difficulty,"sn":"hard","box":function ($v) { return Bridge.box($v, Difficulty, System.Enum.toStringFn(Difficulty));}}]}; }, $n);
    /*Difficulty end.*/

    /*GameManager start.*/
    $m("GameManager", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[1].Void},{"a":2,"n":"BotAmount","t":8,"sn":"BotAmount","rt":$n[1].Void},{"a":2,"n":"CheckLevelProgression","t":8,"sn":"CheckLevelProgression","rt":$n[1].Void},{"a":2,"n":"DifficultyControl","t":8,"sn":"DifficultyControl","rt":$n[1].Void},{"a":2,"n":"FOVControl","t":8,"sn":"FOVControl","rt":$n[1].Void},{"a":2,"n":"GiveCoin","t":8,"pi":[{"n":"i","pt":$n[1].Int32,"ps":0}],"sn":"GiveCoin","rt":$n[1].Void,"p":[$n[1].Int32]},{"a":2,"n":"GiveWood","t":8,"pi":[{"n":"i","pt":$n[1].Int32,"ps":0}],"sn":"GiveWood","rt":$n[1].Void,"p":[$n[1].Int32]},{"a":2,"n":"LevelCompleteUponEnteringPortal","t":8,"sn":"LevelCompleteUponEnteringPortal","rt":$n[1].Void},{"a":2,"n":"OnAfterDeserialize","t":8,"sn":"OnAfterDeserialize","rt":$n[1].Void},{"a":2,"n":"OnBeforeSerialize","t":8,"sn":"OnBeforeSerialize","rt":$n[1].Void},{"a":2,"n":"SetCurrentWorld","t":8,"sn":"SetCurrentWorld","rt":$n[1].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"arrows","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"arrows"},{"a":2,"n":"botSpawner","t":4,"rt":$n[0].GameObject,"sn":"botSpawner"},{"a":2,"n":"botsKilled","t":4,"rt":$n[1].Int32,"sn":"botsKilled","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"botsToKill","t":4,"rt":$n[1].Int32,"sn":"botsToKill","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"coinPrefab","t":4,"rt":$n[0].GameObject,"sn":"coinPrefab"},{"a":2,"n":"confettiFX","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"confettiFX"},{"at":[new UnityEngine.SerializeFieldAttribute(),new UnityEngine.LunaPlaygroundFieldAttribute("Difficulty", 0, null, false)],"a":2,"n":"difficulty","t":4,"rt":Difficulty,"sn":"difficulty","box":function ($v) { return Bridge.box($v, Difficulty, System.Enum.toStringFn(Difficulty));}},{"a":2,"n":"dmgTextPopupPrefab","t":4,"rt":$n[0].GameObject,"sn":"dmgTextPopupPrefab"},{"a":2,"n":"endCamPos","t":4,"rt":$n[0].GameObject,"sn":"endCamPos"},{"at":[new UnityEngine.HeaderAttribute("World Info")],"a":2,"n":"environments","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"environments"},{"a":2,"n":"gameLevel","t":4,"rt":$n[1].Int32,"sn":"gameLevel","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.HeaderAttribute("LUNA VARIABLES"),new UnityEngine.SerializeFieldAttribute(),new UnityEngine.LunaPlaygroundFieldAttribute("Game Over Panel Status", 0, null, false)],"a":2,"n":"gameOverPanelStatus","t":4,"rt":GameOverPanelStatus,"sn":"gameOverPanelStatus","box":function ($v) { return Bridge.box($v, GameOverPanelStatus, System.Enum.toStringFn(GameOverPanelStatus));}},{"a":2,"n":"gamelevelKey","is":true,"t":4,"rt":$n[1].String,"sn":"gamelevelKey"},{"a":2,"n":"ground","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"ground"},{"a":2,"n":"groundMats","t":4,"rt":System.Array.type(UnityEngine.Material),"sn":"groundMats"},{"a":2,"n":"hitDiamondFX","t":4,"rt":$n[0].GameObject,"sn":"hitDiamondFX"},{"a":2,"n":"hitFX","t":4,"rt":$n[0].GameObject,"sn":"hitFX"},{"a":2,"n":"hitGoldFX","t":4,"rt":$n[0].GameObject,"sn":"hitGoldFX"},{"a":2,"n":"hitSilverFX","t":4,"rt":$n[0].GameObject,"sn":"hitSilverFX"},{"a":2,"n":"hitTreeFX","t":4,"rt":$n[0].GameObject,"sn":"hitTreeFX"},{"a":2,"n":"ingameWoodCount","t":4,"rt":$n[1].Int32,"sn":"ingameWoodCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"instance","is":true,"t":4,"rt":GameManager,"sn":"instance"},{"a":2,"n":"levelID","t":4,"rt":$n[1].Int32,"sn":"levelID","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"levelKey","is":true,"t":4,"rt":$n[1].String,"sn":"levelKey"},{"a":2,"n":"mainCam","t":4,"rt":$n[0].GameObject,"sn":"mainCam"},{"a":2,"n":"player","t":4,"rt":$n[0].GameObject,"sn":"player"},{"a":2,"n":"playerCon","t":4,"rt":PlayerController,"sn":"playerCon"},{"a":2,"n":"popFX","t":4,"rt":$n[0].GameObject,"sn":"popFX"},{"a":2,"n":"portalPrefab","t":4,"rt":$n[0].GameObject,"sn":"portalPrefab"},{"a":2,"n":"resourcePickup5StacksPrefabs","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"resourcePickup5StacksPrefabs"},{"a":2,"n":"resourcePickupPrefabs","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"resourcePickupPrefabs"},{"a":2,"n":"startGame","t":4,"rt":$n[1].Boolean,"sn":"startGame","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.HeaderAttribute("FX")],"a":2,"n":"tapFX","t":4,"rt":$n[0].GameObject,"sn":"tapFX"},{"a":2,"n":"totalCoin","t":4,"rt":$n[1].Int32,"sn":"totalCoin","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"totalDiamond","t":4,"rt":$n[1].Int32,"sn":"totalDiamond","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"totalDiamondKey","is":true,"t":4,"rt":$n[1].String,"sn":"totalDiamondKey"},{"a":2,"n":"totalGold","t":4,"rt":$n[1].Int32,"sn":"totalGold","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"totalGoldKey","is":true,"t":4,"rt":$n[1].String,"sn":"totalGoldKey"},{"a":2,"n":"totalSilver","t":4,"rt":$n[1].Int32,"sn":"totalSilver","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"totalSilverKey","is":true,"t":4,"rt":$n[1].String,"sn":"totalSilverKey"},{"a":2,"n":"totalWood","t":4,"rt":$n[1].Int32,"sn":"totalWood","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"totalWoodKey","is":true,"t":4,"rt":$n[1].String,"sn":"totalWoodKey"},{"at":[new UnityEngine.SerializeFieldAttribute(),new UnityEngine.HeaderAttribute("Currency")],"a":2,"n":"totalcoinKey","is":true,"t":4,"rt":$n[1].String,"sn":"totalcoinKey"},{"a":2,"n":"victory","t":4,"rt":$n[1].Boolean,"sn":"victory","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"woodLogPrefab","t":4,"rt":$n[0].GameObject,"sn":"woodLogPrefab"},{"at":[new UnityEngine.HeaderAttribute("LumberCraft")],"a":2,"n":"woodPickupPrefab","t":4,"rt":$n[0].GameObject,"sn":"woodPickupPrefab"},{"a":2,"n":"woodPlusTextPopupPrefab","t":4,"rt":$n[0].GameObject,"sn":"woodPlusTextPopupPrefab"},{"a":2,"n":"worldID","t":4,"rt":$n[1].Int32,"sn":"worldID","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.HeaderAttribute("Level Info")],"a":2,"n":"worldKey","is":true,"t":4,"rt":$n[1].String,"sn":"worldKey"}]}; }, $n);
    /*GameManager end.*/

    /*PlayerBullet start.*/
    $m("PlayerBullet", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"GetTarget","t":8,"pi":[{"n":"_target","pt":$n[0].Transform,"ps":0}],"sn":"GetTarget","rt":$n[1].Void,"p":[$n[0].Transform]},{"a":1,"n":"OnTriggerEnter","t":8,"pi":[{"n":"other","pt":$n[0].Collider,"ps":0}],"sn":"OnTriggerEnter","rt":$n[1].Void,"p":[$n[0].Collider]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"speed","t":4,"rt":$n[1].Single,"sn":"speed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"target","t":4,"rt":$n[0].Transform,"sn":"target"}]}; }, $n);
    /*PlayerBullet end.*/

    /*PlayerController start.*/
    $m("PlayerController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"AnimOffRoutine","t":8,"sn":"AnimOffRoutine","rt":$n[2].IEnumerator},{"a":2,"n":"AutoShoot","t":8,"sn":"AutoShoot","rt":$n[1].Void},{"a":2,"n":"AxeColliderRoutine","t":8,"pi":[{"n":"x","pt":$n[0].GameObject,"ps":0}],"sn":"AxeColliderRoutine","rt":$n[2].IEnumerator,"p":[$n[0].GameObject]},{"a":2,"n":"BuildRoutine","t":8,"pi":[{"n":"other","pt":$n[0].GameObject,"ps":0}],"sn":"BuildRoutine","rt":$n[2].IEnumerator,"p":[$n[0].GameObject]},{"a":2,"n":"CompleteLevel","t":8,"sn":"CompleteLevel","rt":$n[1].Void},{"a":2,"n":"GetClosestEnemy","t":8,"sn":"GetClosestEnemy","rt":$n[0].GameObject},{"a":2,"n":"GetPlayerHealth","t":8,"sn":"GetPlayerHealth","rt":$n[1].Void},{"a":1,"n":"InitEmptyStack","t":8,"sn":"InitEmptyStack","rt":$n[1].Void},{"a":1,"n":"OnCollisionEnter","t":8,"pi":[{"n":"other","pt":$n[0].Collision,"ps":0}],"sn":"OnCollisionEnter","rt":$n[1].Void,"p":[$n[0].Collision]},{"a":1,"n":"OnDrawGizmos","t":8,"sn":"OnDrawGizmos","rt":$n[1].Void},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[1].Void},{"a":1,"n":"OnTriggerEnter","t":8,"pi":[{"n":"other","pt":$n[0].Collider,"ps":0}],"sn":"OnTriggerEnter","rt":$n[1].Void,"p":[$n[0].Collider]},{"a":1,"n":"OnTriggerExit","t":8,"pi":[{"n":"other","pt":$n[0].Collider,"ps":0}],"sn":"OnTriggerExit","rt":$n[1].Void,"p":[$n[0].Collider]},{"a":1,"n":"OnTriggerStay","t":8,"pi":[{"n":"other","pt":$n[0].Collider,"ps":0}],"sn":"OnTriggerStay","rt":$n[1].Void,"p":[$n[0].Collider]},{"a":2,"n":"PlayerDeath","t":8,"sn":"PlayerDeath","rt":$n[1].Void},{"a":1,"n":"SpawnPickupable","t":8,"pi":[{"n":"x","pt":$n[0].GameObject,"ps":0}],"sn":"SpawnPickupable","rt":$n[1].Void,"p":[$n[0].GameObject]},{"a":1,"n":"SpawnPickupable5Stack","t":8,"pi":[{"n":"x","pt":$n[0].GameObject,"ps":0}],"sn":"SpawnPickupable5Stack","rt":$n[1].Void,"p":[$n[0].GameObject]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":2,"n":"TakeDamage","t":8,"pi":[{"n":"dmg","pt":$n[1].Int32,"ps":0}],"sn":"TakeDamage","rt":$n[1].Void,"p":[$n[1].Int32]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"WoodStackManagement","t":8,"sn":"WoodStackManagement","rt":$n[1].Void},{"at":[new UnityEngine.HideInInspector()],"a":2,"n":"anim","t":4,"rt":$n[0].Animator,"sn":"anim"},{"a":2,"n":"axeAnim","t":4,"rt":$n[0].GameObject,"sn":"axeAnim"},{"at":[new UnityEngine.HeaderAttribute("LumberCraft")],"a":2,"n":"axeCollider","t":4,"rt":$n[0].GameObject,"sn":"axeCollider"},{"a":1,"n":"building","t":4,"rt":$n[1].Boolean,"sn":"building","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.HeaderAttribute("Shooting")],"a":2,"n":"bullet","t":4,"rt":$n[0].GameObject,"sn":"bullet"},{"a":2,"n":"bulletForTrippleShoot","t":4,"rt":$n[0].GameObject,"sn":"bulletForTrippleShoot"},{"a":2,"n":"bulletShellPrefab","t":4,"rt":$n[0].GameObject,"sn":"bulletShellPrefab"},{"a":2,"n":"canShoot","t":4,"rt":$n[1].Boolean,"sn":"canShoot","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"clickable","t":4,"rt":$n[0].LayerMask,"sn":"clickable"},{"a":2,"n":"closestEnemy","t":4,"rt":$n[0].GameObject,"sn":"closestEnemy"},{"a":2,"n":"dead","t":4,"rt":$n[1].Boolean,"sn":"dead","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"enemies","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"enemies"},{"a":2,"n":"enemyContact","t":4,"rt":$n[1].Boolean,"sn":"enemyContact","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"firePoints","t":4,"rt":System.Array.type(UnityEngine.Transform),"sn":"firePoints"},{"a":2,"n":"footstepDelay","t":4,"rt":$n[1].Single,"sn":"footstepDelay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"hasShield","t":4,"rt":$n[1].Boolean,"sn":"hasShield","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.HeaderAttribute("Triple Shoot")],"a":2,"n":"hasTripleShoot","t":4,"rt":$n[1].Boolean,"sn":"hasTripleShoot","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"health","t":4,"rt":$n[1].Int32,"sn":"health","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.HeaderAttribute("Player Stats"),new UnityEngine.HideInInspector()],"a":2,"n":"healthKey","t":4,"rt":$n[1].String,"sn":"healthKey"},{"a":2,"n":"maxHealth","t":4,"rt":$n[1].Int32,"sn":"maxHealth","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"muzzleFlash","t":4,"rt":$n[0].GameObject,"sn":"muzzleFlash"},{"a":2,"n":"playerShield","t":4,"rt":$n[0].GameObject,"sn":"playerShield"},{"a":2,"n":"range","t":4,"rt":$n[1].Single,"sn":"range","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"at":[new UnityEngine.HideInInspector()],"a":2,"n":"rb","t":4,"rt":$n[0].Rigidbody,"sn":"rb"},{"a":2,"n":"running","t":4,"rt":$n[1].Boolean,"sn":"running","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"shellPoint","t":4,"rt":$n[0].Transform,"sn":"shellPoint"},{"a":2,"n":"shieldLevel","t":4,"rt":$n[1].Int32,"sn":"shieldLevel","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"shieldPickup","t":4,"rt":$n[0].GameObject,"sn":"shieldPickup"},{"at":[new UnityEngine.HeaderAttribute("POWER UPS!"),new UnityEngine.HeaderAttribute("Shield")],"a":2,"n":"shieldPrefab","t":4,"rt":$n[0].GameObject,"sn":"shieldPrefab"},{"a":2,"n":"shootDelay","t":4,"rt":$n[1].Single,"sn":"shootDelay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"shootDelayMax","t":4,"rt":$n[1].Single,"sn":"shootDelayMax","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"slashFX","t":4,"rt":$n[0].GameObject,"sn":"slashFX"},{"a":2,"n":"tapDelay","t":4,"rt":$n[1].Single,"sn":"tapDelay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"tapped","t":4,"rt":$n[1].Boolean,"sn":"tapped","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"target","t":4,"rt":$n[0].Transform,"sn":"target"},{"a":2,"n":"tripleShootTimer","t":4,"rt":$n[1].Single,"sn":"tripleShootTimer","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"tripleShootTimerMax","t":4,"rt":$n[1].Single,"sn":"tripleShootTimerMax","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"woodPickRange","t":4,"rt":$n[1].Single,"sn":"woodPickRange","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"woodStack","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"woodStack"},{"at":[new UnityEngine.HeaderAttribute("Wood Stacking")],"a":2,"n":"woodStackParent","t":4,"rt":$n[0].GameObject,"sn":"woodStackParent"}]}; }, $n);
    /*PlayerController end.*/

    /*SoundManager start.*/
    $m("SoundManager", function () { return {"att":1048577,"a":2,"at":[new UnityEngine.RequireComponent.ctor(UnityEngine.AudioSource)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[1].Void},{"a":2,"n":"GetRandomBotkillSFX","t":8,"sn":"GetRandomBotkillSFX","rt":$n[0].AudioClip},{"a":2,"n":"GetRandomShootSFX","t":8,"sn":"GetRandomShootSFX","rt":$n[0].AudioClip},{"a":2,"n":"GetRandomTreeCutSFX","t":8,"sn":"GetRandomTreeCutSFX","rt":$n[0].AudioClip},{"a":2,"n":"PlayMainMenuAudio","t":8,"sn":"PlayMainMenuAudio","rt":$n[1].Void},{"a":2,"n":"PlaySFX","t":8,"pi":[{"n":"audioClip","pt":$n[0].AudioClip,"ps":0}],"sn":"PlaySFX","rt":$n[1].Void,"p":[$n[0].AudioClip]},{"a":2,"n":"SharedManager","is":true,"t":8,"sn":"SharedManager","rt":SoundManager},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":2,"n":"StopMainMenuAudio","t":8,"sn":"StopMainMenuAudio","rt":$n[1].Void},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"backgroundAudioSource","t":4,"rt":$n[0].AudioSource,"sn":"backgroundAudioSource"},{"a":2,"n":"botKillSFX","t":4,"rt":$n[3].List$1(UnityEngine.AudioClip),"sn":"botKillSFX"},{"a":2,"n":"buildCompleteSFX","t":4,"rt":$n[0].AudioClip,"sn":"buildCompleteSFX"},{"at":[new UnityEngine.HeaderAttribute("LumberCraft")],"a":2,"n":"buildProcessSFX","t":4,"rt":$n[0].AudioClip,"sn":"buildProcessSFX"},{"a":2,"n":"coinPickSFX","t":4,"rt":$n[0].AudioClip,"sn":"coinPickSFX"},{"a":2,"n":"enemyCloneSFX","t":4,"rt":$n[0].AudioClip,"sn":"enemyCloneSFX"},{"a":2,"n":"enemyShootSFX","t":4,"rt":$n[0].AudioClip,"sn":"enemyShootSFX"},{"a":2,"n":"footstepSFX","t":4,"rt":$n[0].AudioClip,"sn":"footstepSFX"},{"a":2,"n":"healthPickSFX","t":4,"rt":$n[0].AudioClip,"sn":"healthPickSFX"},{"a":2,"n":"hitStoneSFX","t":4,"rt":$n[0].AudioClip,"sn":"hitStoneSFX"},{"a":2,"n":"loseSFX","t":4,"rt":$n[0].AudioClip,"sn":"loseSFX"},{"a":2,"n":"portalSFX","t":4,"rt":$n[0].AudioClip,"sn":"portalSFX"},{"a":2,"n":"sfxAuidoSource","t":4,"rt":$n[0].AudioSource,"sn":"sfxAuidoSource"},{"a":2,"n":"sharedInstance","is":true,"t":4,"rt":SoundManager,"sn":"sharedInstance"},{"a":2,"n":"shootSFX","t":4,"rt":$n[3].List$1(UnityEngine.AudioClip),"sn":"shootSFX"},{"a":2,"n":"sniperShotSFX","t":4,"rt":$n[0].AudioClip,"sn":"sniperShotSFX"},{"a":2,"n":"soundOn","t":4,"rt":$n[1].Boolean,"sn":"soundOn","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"treeCutSFX","t":4,"rt":$n[3].List$1(UnityEngine.AudioClip),"sn":"treeCutSFX"},{"a":2,"n":"tripleFirePickSFX","t":4,"rt":$n[0].AudioClip,"sn":"tripleFirePickSFX"}]}; }, $n);
    /*SoundManager end.*/

    /*UIManager start.*/
    $m("UIManager", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[1].Void},{"a":2,"n":"GameOverPanelDelayRoutine","t":8,"sn":"GameOverPanelDelayRoutine","rt":$n[2].IEnumerator},{"a":2,"n":"HomeBtnCallback","t":8,"sn":"HomeBtnCallback","rt":$n[1].Void},{"a":2,"n":"HomeCallback","t":8,"sn":"HomeCallback","rt":$n[1].Void},{"a":2,"n":"InGameProgressionText","t":8,"sn":"InGameProgressionText","rt":$n[1].Void},{"a":2,"n":"InstallFullGameCallback","t":8,"sn":"InstallFullGameCallback","rt":$n[1].Void},{"a":2,"n":"NextBtnCallback","t":8,"sn":"NextBtnCallback","rt":$n[1].Void},{"a":2,"n":"OpenCTAPanelCallback","t":8,"sn":"OpenCTAPanelCallback","rt":$n[1].Void},{"a":2,"n":"PlayBtnCallback","t":8,"sn":"PlayBtnCallback","rt":$n[1].Void},{"a":2,"n":"RetryBtnCallback","t":8,"sn":"RetryBtnCallback","rt":$n[1].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":2,"n":"UpdateWorldUI","t":8,"pi":[{"n":"worldId","pt":$n[1].Int32,"ps":0}],"sn":"UpdateWorldUI","rt":$n[1].Void,"p":[$n[1].Int32]},{"a":2,"n":"WorldsBtnCallback","t":8,"sn":"WorldsBtnCallback","rt":$n[1].Void},{"a":2,"n":"UICanvas","t":4,"rt":$n[0].GameObject,"sn":"UICanvas"},{"a":1,"n":"WorldName","t":4,"rt":$n[1].Array.type(System.String),"sn":"WorldName"},{"a":2,"n":"btnDownload","t":4,"rt":$n[4].Button,"sn":"btnDownload"},{"a":2,"n":"btnLoseNext","t":4,"rt":$n[4].Button,"sn":"btnLoseNext"},{"a":2,"n":"btnWinNext","t":4,"rt":$n[4].Button,"sn":"btnWinNext"},{"a":2,"n":"gameOverPanel","t":4,"rt":$n[0].GameObject,"sn":"gameOverPanel"},{"a":2,"n":"gamePanel","t":4,"rt":$n[0].GameObject,"sn":"gamePanel"},{"a":2,"n":"gameoverLosePanel","t":4,"rt":$n[0].GameObject,"sn":"gameoverLosePanel"},{"a":2,"n":"gameoverWinPanel","t":4,"rt":$n[0].GameObject,"sn":"gameoverWinPanel"},{"a":2,"n":"healthBar","t":4,"rt":$n[4].Image,"sn":"healthBar"},{"a":2,"n":"homeBtn","t":4,"rt":$n[4].Button,"sn":"homeBtn"},{"at":[new UnityEngine.HideInInspector()],"a":2,"n":"howtoPlayTapped","t":4,"rt":$n[1].Boolean,"sn":"howtoPlayTapped","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"imgProdImage","t":4,"rt":$n[4].Image,"sn":"imgProdImage"},{"a":2,"n":"instance","is":true,"t":4,"rt":UIManager,"sn":"instance"},{"a":1,"n":"isLunaGamEndCalled","t":4,"rt":$n[1].Boolean,"sn":"isLunaGamEndCalled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"levelCompletePanel","t":4,"rt":$n[0].GameObject,"sn":"levelCompletePanel"},{"a":2,"n":"levelProgBar","t":4,"rt":$n[4].Image,"sn":"levelProgBar"},{"a":2,"n":"nextBtn","t":4,"rt":$n[4].Button,"sn":"nextBtn"},{"a":2,"n":"panelCTA","t":4,"rt":$n[0].GameObject,"sn":"panelCTA"},{"a":2,"n":"playBtn","t":4,"rt":$n[4].Button,"sn":"playBtn"},{"a":2,"n":"retryBtn","t":4,"rt":$n[4].Button,"sn":"retryBtn"},{"a":2,"n":"retryHomeBtn","t":4,"rt":$n[4].Button,"sn":"retryHomeBtn"},{"a":2,"n":"sharkWorldBtn","t":4,"rt":$n[4].Button,"sn":"sharkWorldBtn"},{"at":[new UnityEngine.HeaderAttribute("World")],"a":2,"n":"sharkWorldPanel","t":4,"rt":$n[0].GameObject,"sn":"sharkWorldPanel"},{"at":[new UnityEngine.HeaderAttribute("Start Panel")],"a":2,"n":"startPanel","t":4,"rt":$n[0].GameObject,"sn":"startPanel"},{"a":2,"n":"tutorial","t":4,"rt":$n[0].GameObject,"sn":"tutorial"},{"a":2,"n":"txtCoin","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtCoin"},{"a":2,"n":"txtHowtoPlay","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtHowtoPlay"},{"a":2,"n":"txtLevel","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtLevel"},{"at":[new UnityEngine.HeaderAttribute("Game Panel")],"a":2,"n":"txtLevelGamePanel","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtLevelGamePanel"},{"a":2,"n":"txtWood","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtWood"},{"a":2,"n":"txtWoodCountInGame","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtWoodCountInGame"},{"a":2,"n":"txtWorld","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtWorld"},{"a":2,"n":"txtWorldGamePanel","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtWorldGamePanel"},{"a":2,"n":"txtWorldName","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtWorldName"},{"a":2,"n":"worldImages","t":4,"rt":$n[3].List$1(UnityEngine.Sprite),"sn":"worldImages"}]}; }, $n);
    /*UIManager end.*/

    /*CFX_AutoStopLoopedEffect start.*/
    $m("CFX_AutoStopLoopedEffect", function () { return {"att":1048577,"a":2,"at":[new UnityEngine.RequireComponent.ctor(UnityEngine.ParticleSystem)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":1,"n":"d","t":4,"rt":$n[1].Single,"sn":"d","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"effectDuration","t":4,"rt":$n[1].Single,"sn":"effectDuration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*CFX_AutoStopLoopedEffect end.*/

    /*CFX_Demo_New start.*/
    $m("CFX_Demo_New", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[1].Void},{"a":1,"n":"CheckForDeletedParticles","t":8,"sn":"CheckForDeletedParticles","rt":$n[2].IEnumerator},{"a":2,"n":"OnNextEffect","t":8,"sn":"OnNextEffect","rt":$n[1].Void},{"a":2,"n":"OnPreviousEffect","t":8,"sn":"OnPreviousEffect","rt":$n[1].Void},{"a":2,"n":"OnToggleCamera","t":8,"sn":"OnToggleCamera","rt":$n[1].Void},{"a":2,"n":"OnToggleGround","t":8,"sn":"OnToggleGround","rt":$n[1].Void},{"a":2,"n":"OnToggleSlowMo","t":8,"sn":"OnToggleSlowMo","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":1,"n":"UpdateUI","t":8,"sn":"UpdateUI","rt":$n[1].Void},{"a":1,"n":"destroyParticles","t":8,"sn":"destroyParticles","rt":$n[1].Void},{"a":1,"n":"nextParticle","t":8,"sn":"nextParticle","rt":$n[1].Void},{"a":1,"n":"prevParticle","t":8,"sn":"prevParticle","rt":$n[1].Void},{"a":1,"n":"spawnParticle","t":8,"sn":"spawnParticle","rt":$n[0].GameObject},{"a":2,"n":"EffectIndexLabel","t":4,"rt":$n[4].Text,"sn":"EffectIndexLabel"},{"at":[new UnityEngine.SpaceAttribute.ctor()],"a":2,"n":"EffectLabel","t":4,"rt":$n[4].Text,"sn":"EffectLabel"},{"a":1,"n":"ParticleExamples","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"ParticleExamples"},{"a":2,"n":"camRotBtn","t":4,"rt":$n[4].Image,"sn":"camRotBtn"},{"a":2,"n":"camRotLabel","t":4,"rt":$n[4].Text,"sn":"camRotLabel"},{"a":1,"n":"defaultCamPosition","t":4,"rt":$n[0].Vector3,"sn":"defaultCamPosition"},{"a":1,"n":"defaultCamRotation","t":4,"rt":$n[0].Quaternion,"sn":"defaultCamRotation"},{"a":1,"n":"exampleIndex","t":4,"rt":$n[1].Int32,"sn":"exampleIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"groundBtn","t":4,"rt":$n[4].Image,"sn":"groundBtn"},{"a":2,"n":"groundCollider","t":4,"rt":$n[0].Collider,"sn":"groundCollider"},{"a":2,"n":"groundLabel","t":4,"rt":$n[4].Text,"sn":"groundLabel"},{"a":2,"n":"groundRenderer","t":4,"rt":$n[0].Renderer,"sn":"groundRenderer"},{"a":1,"n":"onScreenParticles","t":4,"rt":$n[3].List$1(UnityEngine.GameObject),"sn":"onScreenParticles"},{"a":1,"n":"slowMo","t":4,"rt":$n[1].Boolean,"sn":"slowMo","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"at":[new UnityEngine.SpaceAttribute.ctor(),new UnityEngine.SpaceAttribute.ctor()],"a":2,"n":"slowMoBtn","t":4,"rt":$n[4].Image,"sn":"slowMoBtn"},{"a":2,"n":"slowMoLabel","t":4,"rt":$n[4].Text,"sn":"slowMoLabel"}]}; }, $n);
    /*CFX_Demo_New end.*/

    /*CFX_Demo_RandomDir start.*/
    $m("CFX_Demo_RandomDir", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":2,"n":"max","t":4,"rt":$n[0].Vector3,"sn":"max"},{"a":2,"n":"min","t":4,"rt":$n[0].Vector3,"sn":"min"}]}; }, $n);
    /*CFX_Demo_RandomDir end.*/

    /*CFX_Demo_RandomDirectionTranslate start.*/
    $m("CFX_Demo_RandomDirectionTranslate", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"axis","t":4,"rt":$n[0].Vector3,"sn":"axis"},{"a":2,"n":"baseDir","t":4,"rt":$n[0].Vector3,"sn":"baseDir"},{"a":1,"n":"dir","t":4,"rt":$n[0].Vector3,"sn":"dir"},{"a":2,"n":"gravity","t":4,"rt":$n[1].Boolean,"sn":"gravity","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"speed","t":4,"rt":$n[1].Single,"sn":"speed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*CFX_Demo_RandomDirectionTranslate end.*/

    /*CFX_Demo_RotateCamera start.*/
    $m("CFX_Demo_RotateCamera", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"rotating","is":true,"t":4,"rt":$n[1].Boolean,"sn":"rotating","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"rotationCenter","t":4,"rt":$n[0].Transform,"sn":"rotationCenter"},{"a":2,"n":"speed","t":4,"rt":$n[1].Single,"sn":"speed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*CFX_Demo_RotateCamera end.*/

    /*CFX_Demo_Translate start.*/
    $m("CFX_Demo_Translate", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"axis","t":4,"rt":$n[0].Vector3,"sn":"axis"},{"a":1,"n":"dir","t":4,"rt":$n[0].Vector3,"sn":"dir"},{"a":2,"n":"gravity","t":4,"rt":$n[1].Boolean,"sn":"gravity","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"rotation","t":4,"rt":$n[0].Vector3,"sn":"rotation"},{"a":2,"n":"speed","t":4,"rt":$n[1].Single,"sn":"speed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*CFX_Demo_Translate end.*/

    /*CFX_AutoDestructShuriken start.*/
    $m("CFX_AutoDestructShuriken", function () { return {"att":1048577,"a":2,"at":[new UnityEngine.RequireComponent.ctor(UnityEngine.ParticleSystem)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"CheckIfAlive","t":8,"sn":"CheckIfAlive","rt":$n[2].IEnumerator},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[1].Void},{"a":2,"n":"OnlyDeactivate","t":4,"rt":$n[1].Boolean,"sn":"OnlyDeactivate","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*CFX_AutoDestructShuriken end.*/

    /*CFX_AutoRotate start.*/
    $m("CFX_AutoRotate", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"rotation","t":4,"rt":$n[0].Vector3,"sn":"rotation"},{"a":2,"n":"space","t":4,"rt":$n[0].Space,"sn":"space","box":function ($v) { return Bridge.box($v, UnityEngine.Space, System.Enum.toStringFn(UnityEngine.Space));}}]}; }, $n);
    /*CFX_AutoRotate end.*/

    /*CFX_LightFlicker start.*/
    $m("CFX_LightFlicker", function () { return {"att":1048577,"a":2,"at":[new UnityEngine.RequireComponent.ctor(UnityEngine.Light)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[1].Void},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"addIntensity","t":4,"rt":$n[1].Single,"sn":"addIntensity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"baseIntensity","t":4,"rt":$n[1].Single,"sn":"baseIntensity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"loop","t":4,"rt":$n[1].Boolean,"sn":"loop","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"maxIntensity","t":4,"rt":$n[1].Single,"sn":"maxIntensity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"minIntensity","t":4,"rt":$n[1].Single,"sn":"minIntensity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"smoothFactor","t":4,"rt":$n[1].Single,"sn":"smoothFactor","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*CFX_LightFlicker end.*/

    /*CFX_LightIntensityFade start.*/
    $m("CFX_LightIntensityFade", function () { return {"att":1048577,"a":2,"at":[new UnityEngine.RequireComponent.ctor(UnityEngine.Light)],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnEnable","t":8,"sn":"OnEnable","rt":$n[1].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"autodestruct","t":4,"rt":$n[1].Boolean,"sn":"autodestruct","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"baseIntensity","t":4,"rt":$n[1].Single,"sn":"baseIntensity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"delay","t":4,"rt":$n[1].Single,"sn":"delay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"duration","t":4,"rt":$n[1].Single,"sn":"duration","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"finalIntensity","t":4,"rt":$n[1].Single,"sn":"finalIntensity","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"p_delay","t":4,"rt":$n[1].Single,"sn":"p_delay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"p_lifetime","t":4,"rt":$n[1].Single,"sn":"p_lifetime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*CFX_LightIntensityFade end.*/

    /*AnimateTexture start.*/
    $m("AnimateTexture", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"FixedUpdate","t":8,"sn":"FixedUpdate","rt":$n[1].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"rend","t":4,"rt":$n[0].Renderer,"sn":"rend"},{"a":2,"n":"scrollSpeedX","t":4,"rt":$n[1].Single,"sn":"scrollSpeedX","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"scrollSpeedY","t":4,"rt":$n[1].Single,"sn":"scrollSpeedY","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    /*AnimateTexture end.*/

    /*BuildingController start.*/
    $m("BuildingController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"buildCanvas","t":4,"rt":$n[0].GameObject,"sn":"buildCanvas"},{"a":2,"n":"buildStages","t":4,"rt":System.Array.type(UnityEngine.GameObject),"sn":"buildStages"},{"a":2,"n":"isComplete","t":4,"rt":$n[1].Boolean,"sn":"isComplete","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"requiredWood","t":4,"rt":$n[1].Int32,"sn":"requiredWood","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"txtReqWood","t":4,"rt":$n[5].TextMeshPro,"sn":"txtReqWood"}]}; }, $n);
    /*BuildingController end.*/

    /*ResourceStatus start.*/
    $m("ResourceStatus", function () { return {"att":257,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"pickup","is":true,"t":4,"rt":ResourceStatus,"sn":"pickup","box":function ($v) { return Bridge.box($v, ResourceStatus, System.Enum.toStringFn(ResourceStatus));}},{"a":2,"n":"source","is":true,"t":4,"rt":ResourceStatus,"sn":"source","box":function ($v) { return Bridge.box($v, ResourceStatus, System.Enum.toStringFn(ResourceStatus));}}]}; }, $n);
    /*ResourceStatus end.*/

    /*ResourceType start.*/
    $m("ResourceType", function () { return {"att":257,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"diamond","is":true,"t":4,"rt":ResourceType,"sn":"diamond","box":function ($v) { return Bridge.box($v, ResourceType, System.Enum.toStringFn(ResourceType));}},{"a":2,"n":"gold","is":true,"t":4,"rt":ResourceType,"sn":"gold","box":function ($v) { return Bridge.box($v, ResourceType, System.Enum.toStringFn(ResourceType));}},{"a":2,"n":"silver","is":true,"t":4,"rt":ResourceType,"sn":"silver","box":function ($v) { return Bridge.box($v, ResourceType, System.Enum.toStringFn(ResourceType));}},{"a":2,"n":"wood","is":true,"t":4,"rt":ResourceType,"sn":"wood","box":function ($v) { return Bridge.box($v, ResourceType, System.Enum.toStringFn(ResourceType));}}]}; }, $n);
    /*ResourceType end.*/

    /*Farmable start.*/
    $m("Farmable", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"magnetRange","t":4,"rt":$n[1].Single,"sn":"magnetRange","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"resourceStatus","t":4,"rt":ResourceStatus,"sn":"resourceStatus","box":function ($v) { return Bridge.box($v, ResourceStatus, System.Enum.toStringFn(ResourceStatus));}},{"a":2,"n":"resourceType","t":4,"rt":ResourceType,"sn":"resourceType","box":function ($v) { return Bridge.box($v, ResourceType, System.Enum.toStringFn(ResourceType));}},{"a":2,"n":"sourceHealth","t":4,"rt":$n[1].Int32,"sn":"sourceHealth","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*Farmable end.*/

    /*TreeController start.*/
    $m("TreeController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"OnCollisionEnter","t":8,"pi":[{"n":"other","pt":$n[0].Collision,"ps":0}],"sn":"OnCollisionEnter","rt":$n[1].Void,"p":[$n[0].Collision]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"leafFX","t":4,"rt":$n[0].GameObject,"sn":"leafFX"},{"a":2,"n":"treeHealth","t":4,"rt":$n[1].Int32,"sn":"treeHealth","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"treeTop","t":4,"rt":$n[0].GameObject,"sn":"treeTop"}]}; }, $n);
    /*TreeController end.*/

    /*LocalizationReplacer start.*/
    $m("LocalizationReplacer", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Awake","t":8,"sn":"Awake","rt":$n[1].Void},{"a":1,"n":"SetData","t":8,"sn":"SetData","rt":$n[1].Void},{"a":1,"n":"SetImage","t":8,"pi":[{"n":"data","pt":LocalizationImageSet,"ps":0}],"sn":"SetImage","rt":$n[1].Void,"p":[LocalizationImageSet]},{"a":1,"n":"SetText","t":8,"pi":[{"n":"data","pt":LocalizationImageSet,"ps":0}],"sn":"SetText","rt":$n[1].Void,"p":[LocalizationImageSet]},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":2,"n":"MyImage","t":4,"rt":$n[4].Image,"sn":"MyImage"},{"a":2,"n":"Mytxt","t":4,"rt":$n[4].Text,"sn":"Mytxt"},{"a":2,"n":"localizationDatas","t":4,"rt":System.Array.type(LocalizationImageSet),"sn":"localizationDatas"}]}; }, $n);
    /*LocalizationReplacer end.*/

    /*LocalizationImageSet start.*/
    $m("LocalizationImageSet", function () { return {"att":1056769,"a":2,"at":[new System.SerializableAttribute()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Image","t":4,"rt":$n[0].Sprite,"sn":"Image"},{"a":2,"n":"Name","t":4,"rt":$n[1].String,"sn":"Name"},{"a":2,"n":"Str","t":4,"rt":$n[1].String,"sn":"Str"}]}; }, $n);
    /*LocalizationImageSet end.*/

    /*PanelSharkWorlds start.*/
    $m("PanelSharkWorlds", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"Initialize","t":8,"sn":"Initialize","rt":$n[1].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":1,"n":"playerPrefsLoad","t":8,"sn":"playerPrefsLoad","rt":$n[1].Void},{"a":1,"n":"WorldName","t":4,"rt":$n[1].Array.type(System.String),"sn":"WorldName"},{"a":2,"n":"content","t":4,"rt":$n[0].Transform,"sn":"content"},{"a":2,"n":"currentLevel","t":4,"rt":$n[1].Int32,"sn":"currentLevel","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"equippedIndex","t":4,"rt":$n[1].Int32,"sn":"equippedIndex","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"maxLevelCompleted","t":4,"rt":$n[1].Int32,"sn":"maxLevelCompleted","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"sharkProgressItem","t":4,"rt":$n[0].GameObject,"sn":"sharkProgressItem"},{"a":2,"n":"sharkWorldItem","t":4,"rt":$n[0].GameObject,"sn":"sharkWorldItem"},{"a":2,"n":"sharkWorlds","t":4,"rt":System.Array.type(SharkWorldItem),"sn":"sharkWorlds"},{"a":2,"n":"worldCount","t":4,"rt":$n[1].Int32,"sn":"worldCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"worldImages","t":4,"rt":$n[3].List$1(UnityEngine.Sprite),"sn":"worldImages"}]}; }, $n);
    /*PanelSharkWorlds end.*/

    /*SharkWorldItem start.*/
    $m("SharkWorldItem", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"AddListener","t":8,"sn":"AddListener","rt":$n[1].Void},{"a":2,"n":"AddProgressItem","t":8,"pi":[{"n":"progressItem","pt":SharkWorldProgressItem,"ps":0}],"sn":"AddProgressItem","rt":$n[1].Void,"p":[SharkWorldProgressItem]},{"a":2,"n":"GotToWorld","t":8,"sn":"GotToWorld","rt":$n[1].Void},{"a":2,"n":"Initialize","t":8,"pi":[{"n":"id","pt":$n[1].Int32,"ps":0},{"n":"CurrentLevel","pt":$n[1].Int32,"ps":1},{"n":"psw","pt":PanelSharkWorlds,"ps":2},{"n":"worldImage","pt":$n[0].Sprite,"ps":3},{"n":"worldName","pt":$n[1].String,"ps":4}],"sn":"Initialize","rt":$n[1].Void,"p":[$n[1].Int32,$n[1].Int32,PanelSharkWorlds,$n[0].Sprite,$n[1].String]},{"a":2,"n":"getallProgressItem","t":8,"sn":"getallProgressItem","rt":$n[3].List$1(SharkWorldProgressItem)},{"a":2,"n":"btnEquip","t":4,"rt":$n[4].Button,"sn":"btnEquip"},{"a":1,"n":"currentLevel","t":4,"rt":$n[1].Int32,"sn":"currentLevel","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"imgProdImage","t":4,"rt":$n[4].Image,"sn":"imgProdImage"},{"a":2,"n":"lockImage","t":4,"rt":$n[0].GameObject,"sn":"lockImage"},{"a":2,"n":"progressItems","t":4,"rt":$n[3].List$1(SharkWorldProgressItem),"sn":"progressItems"},{"a":1,"n":"sharkWorldPanel","t":4,"rt":PanelSharkWorlds,"sn":"sharkWorldPanel"},{"a":2,"n":"txtWorldName","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtWorldName"},{"a":1,"n":"worldId","t":4,"rt":$n[1].Int32,"sn":"worldId","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*SharkWorldItem end.*/

    /*SharkWorldProgressItem start.*/
    $m("SharkWorldProgressItem", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"AssignRewardImage","t":8,"pi":[{"n":"sprt1","pt":$n[0].Sprite,"ps":0},{"n":"sprt2","pt":$n[0].Sprite,"ps":1}],"sn":"AssignRewardImage","rt":$n[1].Void,"p":[$n[0].Sprite,$n[0].Sprite]},{"a":2,"n":"AssignRewardValue","t":8,"pi":[{"n":"RewardAmount1","pt":$n[1].Int32,"ps":0},{"n":"RewardAmount2","pt":$n[1].Int32,"ps":1}],"sn":"AssignRewardValue","rt":$n[1].Void,"p":[$n[1].Int32,$n[1].Int32]},{"a":2,"n":"SetImgFillImageFill","t":8,"pi":[{"n":"Fillvalue","pt":$n[1].Single,"ps":0}],"sn":"SetImgFillImageFill","rt":$n[1].Void,"p":[$n[1].Single]},{"a":2,"n":"SetTxtClearRoom","t":8,"pi":[{"n":"clearedroom","pt":$n[1].Int32,"ps":0}],"sn":"SetTxtClearRoom","rt":$n[1].Void,"p":[$n[1].Int32]},{"a":2,"n":"SetTxtProgress","t":8,"pi":[{"n":"current","pt":$n[1].Int32,"ps":0},{"n":"target","pt":$n[1].Int32,"ps":1}],"sn":"SetTxtProgress","rt":$n[1].Void,"p":[$n[1].Int32,$n[1].Int32]},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":2,"n":"btnClickCallback","t":8,"sn":"btnClickCallback","rt":$n[1].Void},{"a":2,"n":"init","t":8,"pi":[{"n":"world","pt":SharkWorldItem,"ps":0},{"n":"WorldId","pt":$n[1].Int32,"ps":1},{"n":"ProgressId","pt":$n[1].Int32,"ps":2},{"n":"CurrentLevel","pt":$n[1].Int32,"ps":3},{"n":"reward1","pt":$n[1].Int32,"ps":4}],"sn":"init","rt":SharkWorldProgressItem,"p":[SharkWorldItem,$n[1].Int32,$n[1].Int32,$n[1].Int32,$n[1].Int32]},{"a":2,"n":"btnClick","t":4,"rt":$n[4].Button,"sn":"btnClick"},{"a":2,"n":"clamiedImg","t":4,"rt":$n[0].GameObject,"sn":"clamiedImg"},{"a":1,"n":"clearedRoom","t":4,"rt":$n[1].Int32,"sn":"clearedRoom","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"currentLevel","t":4,"rt":$n[1].Int32,"sn":"currentLevel","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"currentProgress","t":4,"rt":$n[1].Int32,"sn":"currentProgress","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"fillValue","t":4,"rt":$n[1].Single,"sn":"fillValue","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"imgFillImage","t":4,"rt":$n[4].Image,"sn":"imgFillImage"},{"a":2,"n":"imgItem1","t":4,"rt":$n[4].Image,"sn":"imgItem1"},{"a":2,"n":"imgItem2","t":4,"rt":$n[4].Image,"sn":"imgItem2"},{"a":1,"n":"myWorld","t":4,"rt":SharkWorldItem,"sn":"myWorld"},{"a":1,"n":"progressId","t":4,"rt":$n[1].Int32,"sn":"progressId","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.HeaderAttribute("VALUES")],"a":1,"n":"rewardAmount1","t":4,"rt":$n[1].Int32,"sn":"rewardAmount1","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.HeaderAttribute("VALUES")],"a":1,"n":"rewardAmount2","t":4,"rt":$n[1].Int32,"sn":"rewardAmount2","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"sprite1","t":4,"rt":$n[0].Sprite,"sn":"sprite1"},{"a":1,"n":"sprite2","t":4,"rt":$n[0].Sprite,"sn":"sprite2"},{"a":1,"n":"targetProgress","t":4,"rt":$n[1].Int32,"sn":"targetProgress","box":function ($v) { return Bridge.box($v, System.Int32);}},{"at":[new UnityEngine.HeaderAttribute("UI Elements")],"a":2,"n":"txtClearLevel","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtClearLevel"},{"a":2,"n":"txtProgress","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtProgress"},{"a":2,"n":"txtRewardAmount1","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtRewardAmount1"},{"a":2,"n":"txtRewardAmount2","t":4,"rt":$n[5].TextMeshProUGUI,"sn":"txtRewardAmount2"},{"a":1,"n":"worldId","t":4,"rt":$n[1].Int32,"sn":"worldId","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*SharkWorldProgressItem end.*/

    /*UiCart start.*/
    $m("UiCart", function () { return {"att":257,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"new_ui","is":true,"t":4,"rt":UiCart,"sn":"new_ui","box":function ($v) { return Bridge.box($v, UiCart, System.Enum.toStringFn(UiCart));}},{"a":2,"n":"old_ui","is":true,"t":4,"rt":UiCart,"sn":"old_ui","box":function ($v) { return Bridge.box($v, UiCart, System.Enum.toStringFn(UiCart));}}]}; }, $n);
    /*UiCart end.*/

    /*PanelCTA_UI start.*/
    $m("PanelCTA_UI", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"DownloadCallBack","t":8,"sn":"DownloadCallBack","rt":$n[1].Void},{"a":1,"n":"RetryCallBack","t":8,"sn":"RetryCallBack","rt":$n[1].Void},{"a":2,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"at":[new UnityEngine.HeaderAttribute("------UI Components----"),new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"btnDownload","t":4,"rt":$n[4].Button,"sn":"btnDownload"},{"at":[new UnityEngine.SerializeFieldAttribute()],"a":1,"n":"btnRetry","t":4,"rt":$n[4].Button,"sn":"btnRetry"}]}; }, $n);
    /*PanelCTA_UI end.*/

    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty start.*/
    $m("IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"}]}; }, $n);
    /*IAmAnEmptyScriptJustToMakeCodelessProjectsCompileProperty end.*/

    /*DG.Tweening.DOTweenModuleAudio start.*/
    $m("DG.Tweening.DOTweenModuleAudio", function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"DOComplete","is":true,"t":8,"pi":[{"n":"target","pt":$n[6].AudioMixer,"ps":0},{"n":"withCallbacks","dv":false,"o":true,"pt":$n[1].Boolean,"ps":1}],"sn":"DOComplete","rt":$n[1].Int32,"p":[$n[6].AudioMixer,$n[1].Boolean],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"DOFade","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].AudioSource,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOFade","rt":$n[7].TweenerCore$3(System.Single,System.Single,DG.Tweening.Plugins.Options.FloatOptions),"p":[$n[0].AudioSource,$n[1].Single,$n[1].Single]},{"a":2,"n":"DOFlip","is":true,"t":8,"pi":[{"n":"target","pt":$n[6].AudioMixer,"ps":0}],"sn":"DOFlip","rt":$n[1].Int32,"p":[$n[6].AudioMixer],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"DOGoto","is":true,"t":8,"pi":[{"n":"target","pt":$n[6].AudioMixer,"ps":0},{"n":"to","pt":$n[1].Single,"ps":1},{"n":"andPlay","dv":false,"o":true,"pt":$n[1].Boolean,"ps":2}],"sn":"DOGoto","rt":$n[1].Int32,"p":[$n[6].AudioMixer,$n[1].Single,$n[1].Boolean],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"DOKill","is":true,"t":8,"pi":[{"n":"target","pt":$n[6].AudioMixer,"ps":0},{"n":"complete","dv":false,"o":true,"pt":$n[1].Boolean,"ps":1}],"sn":"DOKill","rt":$n[1].Int32,"p":[$n[6].AudioMixer,$n[1].Boolean],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"DOPause","is":true,"t":8,"pi":[{"n":"target","pt":$n[6].AudioMixer,"ps":0}],"sn":"DOPause","rt":$n[1].Int32,"p":[$n[6].AudioMixer],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"DOPitch","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].AudioSource,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOPitch","rt":$n[7].TweenerCore$3(System.Single,System.Single,DG.Tweening.Plugins.Options.FloatOptions),"p":[$n[0].AudioSource,$n[1].Single,$n[1].Single]},{"a":2,"n":"DOPlay","is":true,"t":8,"pi":[{"n":"target","pt":$n[6].AudioMixer,"ps":0}],"sn":"DOPlay","rt":$n[1].Int32,"p":[$n[6].AudioMixer],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"DOPlayBackwards","is":true,"t":8,"pi":[{"n":"target","pt":$n[6].AudioMixer,"ps":0}],"sn":"DOPlayBackwards","rt":$n[1].Int32,"p":[$n[6].AudioMixer],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"DOPlayForward","is":true,"t":8,"pi":[{"n":"target","pt":$n[6].AudioMixer,"ps":0}],"sn":"DOPlayForward","rt":$n[1].Int32,"p":[$n[6].AudioMixer],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"DORestart","is":true,"t":8,"pi":[{"n":"target","pt":$n[6].AudioMixer,"ps":0}],"sn":"DORestart","rt":$n[1].Int32,"p":[$n[6].AudioMixer],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"DORewind","is":true,"t":8,"pi":[{"n":"target","pt":$n[6].AudioMixer,"ps":0}],"sn":"DORewind","rt":$n[1].Int32,"p":[$n[6].AudioMixer],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"DOSetFloat","is":true,"t":8,"pi":[{"n":"target","pt":$n[6].AudioMixer,"ps":0},{"n":"floatName","pt":$n[1].String,"ps":1},{"n":"endValue","pt":$n[1].Single,"ps":2},{"n":"duration","pt":$n[1].Single,"ps":3}],"sn":"DOSetFloat","rt":$n[7].TweenerCore$3(System.Single,System.Single,DG.Tweening.Plugins.Options.FloatOptions),"p":[$n[6].AudioMixer,$n[1].String,$n[1].Single,$n[1].Single]},{"a":2,"n":"DOSmoothRewind","is":true,"t":8,"pi":[{"n":"target","pt":$n[6].AudioMixer,"ps":0}],"sn":"DOSmoothRewind","rt":$n[1].Int32,"p":[$n[6].AudioMixer],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"DOTogglePause","is":true,"t":8,"pi":[{"n":"target","pt":$n[6].AudioMixer,"ps":0}],"sn":"DOTogglePause","rt":$n[1].Int32,"p":[$n[6].AudioMixer],"box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    /*DG.Tweening.DOTweenModuleAudio end.*/

    /*DG.Tweening.DOTweenModulePhysics start.*/
    $m("DG.Tweening.DOTweenModulePhysics", function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"DOJump","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody,"ps":0},{"n":"endValue","pt":$n[0].Vector3,"ps":1},{"n":"jumpPower","pt":$n[1].Single,"ps":2},{"n":"numJumps","pt":$n[1].Int32,"ps":3},{"n":"duration","pt":$n[1].Single,"ps":4},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":5}],"sn":"DOJump","rt":$n[8].Sequence,"p":[$n[0].Rigidbody,$n[0].Vector3,$n[1].Single,$n[1].Int32,$n[1].Single,$n[1].Boolean]},{"a":4,"n":"DOLocalPath","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody,"ps":0},{"n":"path","pt":$n[9].Path,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"pathMode","dv":1,"o":true,"pt":$n[8].PathMode,"ps":3}],"sn":"DOLocalPath$1","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions),"p":[$n[0].Rigidbody,$n[9].Path,$n[1].Single,$n[8].PathMode]},{"a":2,"n":"DOLocalPath","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody,"ps":0},{"n":"path","pt":System.Array.type(UnityEngine.Vector3),"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"pathType","dv":0,"o":true,"pt":$n[8].PathType,"ps":3},{"n":"pathMode","dv":1,"o":true,"pt":$n[8].PathMode,"ps":4},{"n":"resolution","dv":10,"o":true,"pt":$n[1].Int32,"ps":5},{"n":"gizmoColor","dv":null,"o":true,"pt":$n[1].Nullable$1(UnityEngine.Color),"ps":6}],"sn":"DOLocalPath","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions),"p":[$n[0].Rigidbody,System.Array.type(UnityEngine.Vector3),$n[1].Single,$n[8].PathType,$n[8].PathMode,$n[1].Int32,$n[1].Nullable$1(UnityEngine.Color)]},{"a":2,"n":"DOLookAt","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody,"ps":0},{"n":"towards","pt":$n[0].Vector3,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"axisConstraint","dv":0,"o":true,"pt":$n[8].AxisConstraint,"ps":3},{"n":"up","dv":null,"o":true,"pt":$n[1].Nullable$1(UnityEngine.Vector3),"ps":4}],"sn":"DOLookAt","rt":$n[7].TweenerCore$3(UnityEngine.Quaternion,UnityEngine.Vector3,DG.Tweening.Plugins.Options.QuaternionOptions),"p":[$n[0].Rigidbody,$n[0].Vector3,$n[1].Single,$n[8].AxisConstraint,$n[1].Nullable$1(UnityEngine.Vector3)]},{"a":2,"n":"DOMove","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody,"ps":0},{"n":"endValue","pt":$n[0].Vector3,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOMove","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,UnityEngine.Vector3,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].Rigidbody,$n[0].Vector3,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOMoveX","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOMoveX","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,UnityEngine.Vector3,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].Rigidbody,$n[1].Single,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOMoveY","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOMoveY","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,UnityEngine.Vector3,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].Rigidbody,$n[1].Single,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOMoveZ","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOMoveZ","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,UnityEngine.Vector3,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].Rigidbody,$n[1].Single,$n[1].Single,$n[1].Boolean]},{"a":4,"n":"DOPath","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody,"ps":0},{"n":"path","pt":$n[9].Path,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"pathMode","dv":1,"o":true,"pt":$n[8].PathMode,"ps":3}],"sn":"DOPath$1","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions),"p":[$n[0].Rigidbody,$n[9].Path,$n[1].Single,$n[8].PathMode]},{"a":2,"n":"DOPath","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody,"ps":0},{"n":"path","pt":System.Array.type(UnityEngine.Vector3),"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"pathType","dv":0,"o":true,"pt":$n[8].PathType,"ps":3},{"n":"pathMode","dv":1,"o":true,"pt":$n[8].PathMode,"ps":4},{"n":"resolution","dv":10,"o":true,"pt":$n[1].Int32,"ps":5},{"n":"gizmoColor","dv":null,"o":true,"pt":$n[1].Nullable$1(UnityEngine.Color),"ps":6}],"sn":"DOPath","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions),"p":[$n[0].Rigidbody,System.Array.type(UnityEngine.Vector3),$n[1].Single,$n[8].PathType,$n[8].PathMode,$n[1].Int32,$n[1].Nullable$1(UnityEngine.Color)]},{"a":2,"n":"DORotate","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody,"ps":0},{"n":"endValue","pt":$n[0].Vector3,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"mode","dv":0,"o":true,"pt":$n[8].RotateMode,"ps":3}],"sn":"DORotate","rt":$n[7].TweenerCore$3(UnityEngine.Quaternion,UnityEngine.Vector3,DG.Tweening.Plugins.Options.QuaternionOptions),"p":[$n[0].Rigidbody,$n[0].Vector3,$n[1].Single,$n[8].RotateMode]}]}; }, $n);
    /*DG.Tweening.DOTweenModulePhysics end.*/

    /*DG.Tweening.DOTweenModulePhysics2D start.*/
    $m("DG.Tweening.DOTweenModulePhysics2D", function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"DOJump","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody2D,"ps":0},{"n":"endValue","pt":$n[0].Vector2,"ps":1},{"n":"jumpPower","pt":$n[1].Single,"ps":2},{"n":"numJumps","pt":$n[1].Int32,"ps":3},{"n":"duration","pt":$n[1].Single,"ps":4},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":5}],"sn":"DOJump","rt":$n[8].Sequence,"p":[$n[0].Rigidbody2D,$n[0].Vector2,$n[1].Single,$n[1].Int32,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOLocalPath","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody2D,"ps":0},{"n":"path","pt":System.Array.type(UnityEngine.Vector2),"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"pathType","dv":0,"o":true,"pt":$n[8].PathType,"ps":3},{"n":"pathMode","dv":1,"o":true,"pt":$n[8].PathMode,"ps":4},{"n":"resolution","dv":10,"o":true,"pt":$n[1].Int32,"ps":5},{"n":"gizmoColor","dv":null,"o":true,"pt":$n[1].Nullable$1(UnityEngine.Color),"ps":6}],"sn":"DOLocalPath","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions),"p":[$n[0].Rigidbody2D,System.Array.type(UnityEngine.Vector2),$n[1].Single,$n[8].PathType,$n[8].PathMode,$n[1].Int32,$n[1].Nullable$1(UnityEngine.Color)]},{"a":2,"n":"DOMove","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody2D,"ps":0},{"n":"endValue","pt":$n[0].Vector2,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOMove","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].Rigidbody2D,$n[0].Vector2,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOMoveX","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody2D,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOMoveX","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].Rigidbody2D,$n[1].Single,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOMoveY","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody2D,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOMoveY","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].Rigidbody2D,$n[1].Single,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOPath","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody2D,"ps":0},{"n":"path","pt":System.Array.type(UnityEngine.Vector2),"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"pathType","dv":0,"o":true,"pt":$n[8].PathType,"ps":3},{"n":"pathMode","dv":1,"o":true,"pt":$n[8].PathMode,"ps":4},{"n":"resolution","dv":10,"o":true,"pt":$n[1].Int32,"ps":5},{"n":"gizmoColor","dv":null,"o":true,"pt":$n[1].Nullable$1(UnityEngine.Color),"ps":6}],"sn":"DOPath","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions),"p":[$n[0].Rigidbody2D,System.Array.type(UnityEngine.Vector2),$n[1].Single,$n[8].PathType,$n[8].PathMode,$n[1].Int32,$n[1].Nullable$1(UnityEngine.Color)]},{"a":2,"n":"DORotate","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Rigidbody2D,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DORotate","rt":$n[7].TweenerCore$3(System.Single,System.Single,DG.Tweening.Plugins.Options.FloatOptions),"p":[$n[0].Rigidbody2D,$n[1].Single,$n[1].Single]}]}; }, $n);
    /*DG.Tweening.DOTweenModulePhysics2D end.*/

    /*DG.Tweening.DOTweenModuleSprite start.*/
    $m("DG.Tweening.DOTweenModuleSprite", function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"DOBlendableColor","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].SpriteRenderer,"ps":0},{"n":"endValue","pt":$n[0].Color,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOBlendableColor","rt":$n[8].Tweener,"p":[$n[0].SpriteRenderer,$n[0].Color,$n[1].Single]},{"a":2,"n":"DOColor","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].SpriteRenderer,"ps":0},{"n":"endValue","pt":$n[0].Color,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOColor","rt":$n[7].TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions),"p":[$n[0].SpriteRenderer,$n[0].Color,$n[1].Single]},{"a":2,"n":"DOFade","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].SpriteRenderer,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOFade","rt":$n[7].TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions),"p":[$n[0].SpriteRenderer,$n[1].Single,$n[1].Single]},{"a":2,"n":"DOGradientColor","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].SpriteRenderer,"ps":0},{"n":"gradient","pt":$n[0].Gradient,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOGradientColor","rt":$n[8].Sequence,"p":[$n[0].SpriteRenderer,$n[0].Gradient,$n[1].Single]}]}; }, $n);
    /*DG.Tweening.DOTweenModuleSprite end.*/

    /*DG.Tweening.DOTweenModuleUI start.*/
    $m("DG.Tweening.DOTweenModuleUI", function () { return {"nested":[$n[8].DOTweenModuleUI.Utils],"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"DOAnchorMax","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[0].Vector2,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOAnchorMax","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].RectTransform,$n[0].Vector2,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOAnchorMin","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[0].Vector2,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOAnchorMin","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].RectTransform,$n[0].Vector2,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOAnchorPos","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[0].Vector2,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOAnchorPos","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].RectTransform,$n[0].Vector2,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOAnchorPos3D","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[0].Vector3,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOAnchorPos3D","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,UnityEngine.Vector3,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].RectTransform,$n[0].Vector3,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOAnchorPos3DX","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOAnchorPos3DX","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,UnityEngine.Vector3,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].RectTransform,$n[1].Single,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOAnchorPos3DY","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOAnchorPos3DY","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,UnityEngine.Vector3,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].RectTransform,$n[1].Single,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOAnchorPos3DZ","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOAnchorPos3DZ","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,UnityEngine.Vector3,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].RectTransform,$n[1].Single,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOAnchorPosX","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOAnchorPosX","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].RectTransform,$n[1].Single,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOAnchorPosY","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOAnchorPosY","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].RectTransform,$n[1].Single,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOBlendableColor","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Graphic,"ps":0},{"n":"endValue","pt":$n[0].Color,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOBlendableColor","rt":$n[8].Tweener,"p":[$n[4].Graphic,$n[0].Color,$n[1].Single]},{"a":2,"n":"DOBlendableColor","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Image,"ps":0},{"n":"endValue","pt":$n[0].Color,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOBlendableColor$1","rt":$n[8].Tweener,"p":[$n[4].Image,$n[0].Color,$n[1].Single]},{"a":2,"n":"DOBlendableColor","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Text,"ps":0},{"n":"endValue","pt":$n[0].Color,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOBlendableColor$2","rt":$n[8].Tweener,"p":[$n[4].Text,$n[0].Color,$n[1].Single]},{"a":2,"n":"DOColor","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Graphic,"ps":0},{"n":"endValue","pt":$n[0].Color,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOColor","rt":$n[7].TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions),"p":[$n[4].Graphic,$n[0].Color,$n[1].Single]},{"a":2,"n":"DOColor","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Image,"ps":0},{"n":"endValue","pt":$n[0].Color,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOColor$1","rt":$n[7].TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions),"p":[$n[4].Image,$n[0].Color,$n[1].Single]},{"a":2,"n":"DOColor","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Outline,"ps":0},{"n":"endValue","pt":$n[0].Color,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOColor$2","rt":$n[7].TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions),"p":[$n[4].Outline,$n[0].Color,$n[1].Single]},{"a":2,"n":"DOColor","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Text,"ps":0},{"n":"endValue","pt":$n[0].Color,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOColor$3","rt":$n[7].TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions),"p":[$n[4].Text,$n[0].Color,$n[1].Single]},{"a":2,"n":"DOCounter","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Text,"ps":0},{"n":"fromValue","pt":$n[1].Int32,"ps":1},{"n":"endValue","pt":$n[1].Int32,"ps":2},{"n":"duration","pt":$n[1].Single,"ps":3},{"n":"addThousandsSeparator","dv":true,"o":true,"pt":$n[1].Boolean,"ps":4},{"n":"culture","dv":null,"o":true,"pt":$n[10].CultureInfo,"ps":5}],"sn":"DOCounter","rt":$n[7].TweenerCore$3(System.Int32,System.Int32,DG.Tweening.Plugins.Options.NoOptions),"p":[$n[4].Text,$n[1].Int32,$n[1].Int32,$n[1].Single,$n[1].Boolean,$n[10].CultureInfo]},{"a":2,"n":"DOFade","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].CanvasGroup,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOFade","rt":$n[7].TweenerCore$3(System.Single,System.Single,DG.Tweening.Plugins.Options.FloatOptions),"p":[$n[0].CanvasGroup,$n[1].Single,$n[1].Single]},{"a":2,"n":"DOFade","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Graphic,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOFade$1","rt":$n[7].TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions),"p":[$n[4].Graphic,$n[1].Single,$n[1].Single]},{"a":2,"n":"DOFade","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Image,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOFade$2","rt":$n[7].TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions),"p":[$n[4].Image,$n[1].Single,$n[1].Single]},{"a":2,"n":"DOFade","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Outline,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOFade$3","rt":$n[7].TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions),"p":[$n[4].Outline,$n[1].Single,$n[1].Single]},{"a":2,"n":"DOFade","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Text,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOFade$4","rt":$n[7].TweenerCore$3(UnityEngine.Color,UnityEngine.Color,DG.Tweening.Plugins.Options.ColorOptions),"p":[$n[4].Text,$n[1].Single,$n[1].Single]},{"a":2,"n":"DOFillAmount","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Image,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOFillAmount","rt":$n[7].TweenerCore$3(System.Single,System.Single,DG.Tweening.Plugins.Options.FloatOptions),"p":[$n[4].Image,$n[1].Single,$n[1].Single]},{"a":2,"n":"DOFlexibleSize","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].LayoutElement,"ps":0},{"n":"endValue","pt":$n[0].Vector2,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOFlexibleSize","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[4].LayoutElement,$n[0].Vector2,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOGradientColor","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Image,"ps":0},{"n":"gradient","pt":$n[0].Gradient,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOGradientColor","rt":$n[8].Sequence,"p":[$n[4].Image,$n[0].Gradient,$n[1].Single]},{"a":2,"n":"DOHorizontalNormalizedPos","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].ScrollRect,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOHorizontalNormalizedPos","rt":$n[8].Tweener,"p":[$n[4].ScrollRect,$n[1].Single,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOJumpAnchorPos","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[0].Vector2,"ps":1},{"n":"jumpPower","pt":$n[1].Single,"ps":2},{"n":"numJumps","pt":$n[1].Int32,"ps":3},{"n":"duration","pt":$n[1].Single,"ps":4},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":5}],"sn":"DOJumpAnchorPos","rt":$n[8].Sequence,"p":[$n[0].RectTransform,$n[0].Vector2,$n[1].Single,$n[1].Int32,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOMinSize","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].LayoutElement,"ps":0},{"n":"endValue","pt":$n[0].Vector2,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOMinSize","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[4].LayoutElement,$n[0].Vector2,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DONormalizedPos","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].ScrollRect,"ps":0},{"n":"endValue","pt":$n[0].Vector2,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DONormalizedPos","rt":$n[8].Tweener,"p":[$n[4].ScrollRect,$n[0].Vector2,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOPivot","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[0].Vector2,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOPivot","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].RectTransform,$n[0].Vector2,$n[1].Single]},{"a":2,"n":"DOPivotX","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOPivotX","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].RectTransform,$n[1].Single,$n[1].Single]},{"a":2,"n":"DOPivotY","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOPivotY","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].RectTransform,$n[1].Single,$n[1].Single]},{"a":2,"n":"DOPreferredSize","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].LayoutElement,"ps":0},{"n":"endValue","pt":$n[0].Vector2,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOPreferredSize","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[4].LayoutElement,$n[0].Vector2,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOPunchAnchorPos","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"punch","pt":$n[0].Vector2,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"vibrato","dv":10,"o":true,"pt":$n[1].Int32,"ps":3},{"n":"elasticity","dv":1.0,"o":true,"pt":$n[1].Single,"ps":4},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":5}],"sn":"DOPunchAnchorPos","rt":$n[8].Tweener,"p":[$n[0].RectTransform,$n[0].Vector2,$n[1].Single,$n[1].Int32,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOScale","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Outline,"ps":0},{"n":"endValue","pt":$n[0].Vector2,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOScale","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[4].Outline,$n[0].Vector2,$n[1].Single]},{"a":2,"n":"DOShakeAnchorPos","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"duration","pt":$n[1].Single,"ps":1},{"n":"strength","dv":100.0,"o":true,"pt":$n[1].Single,"ps":2},{"n":"vibrato","dv":10,"o":true,"pt":$n[1].Int32,"ps":3},{"n":"randomness","dv":90.0,"o":true,"pt":$n[1].Single,"ps":4},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":5},{"n":"fadeOut","dv":true,"o":true,"pt":$n[1].Boolean,"ps":6}],"sn":"DOShakeAnchorPos","rt":$n[8].Tweener,"p":[$n[0].RectTransform,$n[1].Single,$n[1].Single,$n[1].Int32,$n[1].Single,$n[1].Boolean,$n[1].Boolean]},{"a":2,"n":"DOShakeAnchorPos","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"duration","pt":$n[1].Single,"ps":1},{"n":"strength","pt":$n[0].Vector2,"ps":2},{"n":"vibrato","dv":10,"o":true,"pt":$n[1].Int32,"ps":3},{"n":"randomness","dv":90.0,"o":true,"pt":$n[1].Single,"ps":4},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":5},{"n":"fadeOut","dv":true,"o":true,"pt":$n[1].Boolean,"ps":6}],"sn":"DOShakeAnchorPos$1","rt":$n[8].Tweener,"p":[$n[0].RectTransform,$n[1].Single,$n[0].Vector2,$n[1].Int32,$n[1].Single,$n[1].Boolean,$n[1].Boolean]},{"a":2,"n":"DOSizeDelta","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].RectTransform,"ps":0},{"n":"endValue","pt":$n[0].Vector2,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOSizeDelta","rt":$n[7].TweenerCore$3(UnityEngine.Vector2,UnityEngine.Vector2,DG.Tweening.Plugins.Options.VectorOptions),"p":[$n[0].RectTransform,$n[0].Vector2,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOText","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Text,"ps":0},{"n":"endValue","pt":$n[1].String,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"richTextEnabled","dv":true,"o":true,"pt":$n[1].Boolean,"ps":3},{"n":"scrambleMode","dv":0,"o":true,"pt":$n[8].ScrambleMode,"ps":4},{"n":"scrambleChars","dv":null,"o":true,"pt":$n[1].String,"ps":5}],"sn":"DOText","rt":$n[7].TweenerCore$3(System.String,System.String,DG.Tweening.Plugins.Options.StringOptions),"p":[$n[4].Text,$n[1].String,$n[1].Single,$n[1].Boolean,$n[8].ScrambleMode,$n[1].String]},{"a":2,"n":"DOValue","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].Slider,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOValue","rt":$n[7].TweenerCore$3(System.Single,System.Single,DG.Tweening.Plugins.Options.FloatOptions),"p":[$n[4].Slider,$n[1].Single,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"DOVerticalNormalizedPos","is":true,"t":8,"pi":[{"n":"target","pt":$n[4].ScrollRect,"ps":0},{"n":"endValue","pt":$n[1].Single,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2},{"n":"snapping","dv":false,"o":true,"pt":$n[1].Boolean,"ps":3}],"sn":"DOVerticalNormalizedPos","rt":$n[8].Tweener,"p":[$n[4].ScrollRect,$n[1].Single,$n[1].Single,$n[1].Boolean]}]}; }, $n);
    /*DG.Tweening.DOTweenModuleUI end.*/

    /*DG.Tweening.DOTweenModuleUI+Utils start.*/
    $m("DG.Tweening.DOTweenModuleUI.Utils", function () { return {"td":$n[8].DOTweenModuleUI,"att":1048962,"a":2,"s":true,"m":[{"a":2,"n":"SwitchToRectTransform","is":true,"t":8,"pi":[{"n":"from","pt":$n[0].RectTransform,"ps":0},{"n":"to","pt":$n[0].RectTransform,"ps":1}],"sn":"SwitchToRectTransform","rt":$n[0].Vector2,"p":[$n[0].RectTransform,$n[0].RectTransform]}]}; }, $n);
    /*DG.Tweening.DOTweenModuleUI+Utils end.*/

    /*DG.Tweening.DOTweenModuleUnityVersion start.*/
    $m("DG.Tweening.DOTweenModuleUnityVersion", function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"DOGradientColor","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Material,"ps":0},{"n":"gradient","pt":$n[0].Gradient,"ps":1},{"n":"duration","pt":$n[1].Single,"ps":2}],"sn":"DOGradientColor","rt":$n[8].Sequence,"p":[$n[0].Material,$n[0].Gradient,$n[1].Single]},{"a":2,"n":"DOGradientColor","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Material,"ps":0},{"n":"gradient","pt":$n[0].Gradient,"ps":1},{"n":"property","pt":$n[1].String,"ps":2},{"n":"duration","pt":$n[1].Single,"ps":3}],"sn":"DOGradientColor$1","rt":$n[8].Sequence,"p":[$n[0].Material,$n[0].Gradient,$n[1].String,$n[1].Single]},{"a":2,"n":"WaitForCompletion","is":true,"t":8,"pi":[{"n":"t","pt":$n[8].Tween,"ps":0},{"n":"returnCustomYieldInstruction","pt":$n[1].Boolean,"ps":1}],"sn":"WaitForCompletion","rt":$n[0].CustomYieldInstruction,"p":[$n[8].Tween,$n[1].Boolean]},{"a":2,"n":"WaitForElapsedLoops","is":true,"t":8,"pi":[{"n":"t","pt":$n[8].Tween,"ps":0},{"n":"elapsedLoops","pt":$n[1].Int32,"ps":1},{"n":"returnCustomYieldInstruction","pt":$n[1].Boolean,"ps":2}],"sn":"WaitForElapsedLoops","rt":$n[0].CustomYieldInstruction,"p":[$n[8].Tween,$n[1].Int32,$n[1].Boolean]},{"a":2,"n":"WaitForKill","is":true,"t":8,"pi":[{"n":"t","pt":$n[8].Tween,"ps":0},{"n":"returnCustomYieldInstruction","pt":$n[1].Boolean,"ps":1}],"sn":"WaitForKill","rt":$n[0].CustomYieldInstruction,"p":[$n[8].Tween,$n[1].Boolean]},{"a":2,"n":"WaitForPosition","is":true,"t":8,"pi":[{"n":"t","pt":$n[8].Tween,"ps":0},{"n":"position","pt":$n[1].Single,"ps":1},{"n":"returnCustomYieldInstruction","pt":$n[1].Boolean,"ps":2}],"sn":"WaitForPosition","rt":$n[0].CustomYieldInstruction,"p":[$n[8].Tween,$n[1].Single,$n[1].Boolean]},{"a":2,"n":"WaitForRewind","is":true,"t":8,"pi":[{"n":"t","pt":$n[8].Tween,"ps":0},{"n":"returnCustomYieldInstruction","pt":$n[1].Boolean,"ps":1}],"sn":"WaitForRewind","rt":$n[0].CustomYieldInstruction,"p":[$n[8].Tween,$n[1].Boolean]},{"a":2,"n":"WaitForStart","is":true,"t":8,"pi":[{"n":"t","pt":$n[8].Tween,"ps":0},{"n":"returnCustomYieldInstruction","pt":$n[1].Boolean,"ps":1}],"sn":"WaitForStart","rt":$n[0].CustomYieldInstruction,"p":[$n[8].Tween,$n[1].Boolean]}]}; }, $n);
    /*DG.Tweening.DOTweenModuleUnityVersion end.*/

    /*DG.Tweening.DOTweenCYInstruction start.*/
    $m("DG.Tweening.DOTweenCYInstruction", function () { return {"nested":[$n[8].DOTweenCYInstruction.WaitForCompletion,$n[8].DOTweenCYInstruction.WaitForRewind,$n[8].DOTweenCYInstruction.WaitForKill,$n[8].DOTweenCYInstruction.WaitForElapsedLoops,$n[8].DOTweenCYInstruction.WaitForPosition,$n[8].DOTweenCYInstruction.WaitForStart],"att":1048961,"a":2,"s":true}; }, $n);
    /*DG.Tweening.DOTweenCYInstruction end.*/

    /*DG.Tweening.DOTweenCYInstruction+WaitForCompletion start.*/
    $m("DG.Tweening.DOTweenCYInstruction.WaitForCompletion", function () { return {"td":$n[8].DOTweenCYInstruction,"att":1048578,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[8].Tween],"pi":[{"n":"tween","pt":$n[8].Tween,"ps":0}],"sn":"ctor"},{"ov":true,"a":2,"n":"keepWaiting","t":16,"rt":$n[1].Boolean,"g":{"ov":true,"a":2,"n":"get_keepWaiting","t":8,"rt":$n[1].Boolean,"fg":"keepWaiting","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"keepWaiting"},{"a":1,"n":"t","t":4,"rt":$n[8].Tween,"sn":"t","ro":true}]}; }, $n);
    /*DG.Tweening.DOTweenCYInstruction+WaitForCompletion end.*/

    /*DG.Tweening.DOTweenCYInstruction+WaitForRewind start.*/
    $m("DG.Tweening.DOTweenCYInstruction.WaitForRewind", function () { return {"td":$n[8].DOTweenCYInstruction,"att":1048578,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[8].Tween],"pi":[{"n":"tween","pt":$n[8].Tween,"ps":0}],"sn":"ctor"},{"ov":true,"a":2,"n":"keepWaiting","t":16,"rt":$n[1].Boolean,"g":{"ov":true,"a":2,"n":"get_keepWaiting","t":8,"rt":$n[1].Boolean,"fg":"keepWaiting","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"keepWaiting"},{"a":1,"n":"t","t":4,"rt":$n[8].Tween,"sn":"t","ro":true}]}; }, $n);
    /*DG.Tweening.DOTweenCYInstruction+WaitForRewind end.*/

    /*DG.Tweening.DOTweenCYInstruction+WaitForKill start.*/
    $m("DG.Tweening.DOTweenCYInstruction.WaitForKill", function () { return {"td":$n[8].DOTweenCYInstruction,"att":1048578,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[8].Tween],"pi":[{"n":"tween","pt":$n[8].Tween,"ps":0}],"sn":"ctor"},{"ov":true,"a":2,"n":"keepWaiting","t":16,"rt":$n[1].Boolean,"g":{"ov":true,"a":2,"n":"get_keepWaiting","t":8,"rt":$n[1].Boolean,"fg":"keepWaiting","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"keepWaiting"},{"a":1,"n":"t","t":4,"rt":$n[8].Tween,"sn":"t","ro":true}]}; }, $n);
    /*DG.Tweening.DOTweenCYInstruction+WaitForKill end.*/

    /*DG.Tweening.DOTweenCYInstruction+WaitForElapsedLoops start.*/
    $m("DG.Tweening.DOTweenCYInstruction.WaitForElapsedLoops", function () { return {"td":$n[8].DOTweenCYInstruction,"att":1048578,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[8].Tween,$n[1].Int32],"pi":[{"n":"tween","pt":$n[8].Tween,"ps":0},{"n":"elapsedLoops","pt":$n[1].Int32,"ps":1}],"sn":"ctor"},{"ov":true,"a":2,"n":"keepWaiting","t":16,"rt":$n[1].Boolean,"g":{"ov":true,"a":2,"n":"get_keepWaiting","t":8,"rt":$n[1].Boolean,"fg":"keepWaiting","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"keepWaiting"},{"a":1,"n":"elapsedLoops","t":4,"rt":$n[1].Int32,"sn":"elapsedLoops","ro":true,"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"t","t":4,"rt":$n[8].Tween,"sn":"t","ro":true}]}; }, $n);
    /*DG.Tweening.DOTweenCYInstruction+WaitForElapsedLoops end.*/

    /*DG.Tweening.DOTweenCYInstruction+WaitForPosition start.*/
    $m("DG.Tweening.DOTweenCYInstruction.WaitForPosition", function () { return {"td":$n[8].DOTweenCYInstruction,"att":1048578,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[8].Tween,$n[1].Single],"pi":[{"n":"tween","pt":$n[8].Tween,"ps":0},{"n":"position","pt":$n[1].Single,"ps":1}],"sn":"ctor"},{"ov":true,"a":2,"n":"keepWaiting","t":16,"rt":$n[1].Boolean,"g":{"ov":true,"a":2,"n":"get_keepWaiting","t":8,"rt":$n[1].Boolean,"fg":"keepWaiting","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"keepWaiting"},{"a":1,"n":"position","t":4,"rt":$n[1].Single,"sn":"position","ro":true,"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"t","t":4,"rt":$n[8].Tween,"sn":"t","ro":true}]}; }, $n);
    /*DG.Tweening.DOTweenCYInstruction+WaitForPosition end.*/

    /*DG.Tweening.DOTweenCYInstruction+WaitForStart start.*/
    $m("DG.Tweening.DOTweenCYInstruction.WaitForStart", function () { return {"td":$n[8].DOTweenCYInstruction,"att":1048578,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[8].Tween],"pi":[{"n":"tween","pt":$n[8].Tween,"ps":0}],"sn":"ctor"},{"ov":true,"a":2,"n":"keepWaiting","t":16,"rt":$n[1].Boolean,"g":{"ov":true,"a":2,"n":"get_keepWaiting","t":8,"rt":$n[1].Boolean,"fg":"keepWaiting","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"keepWaiting"},{"a":1,"n":"t","t":4,"rt":$n[8].Tween,"sn":"t","ro":true}]}; }, $n);
    /*DG.Tweening.DOTweenCYInstruction+WaitForStart end.*/

    /*DG.Tweening.DOTweenModuleUtils start.*/
    $m("DG.Tweening.DOTweenModuleUtils", function () { return {"nested":[$n[8].DOTweenModuleUtils.Physics],"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"Init","is":true,"t":8,"sn":"Init","rt":$n[1].Void},{"a":1,"n":"_initialized","is":true,"t":4,"rt":$n[1].Boolean,"sn":"_initialized","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
    /*DG.Tweening.DOTweenModuleUtils end.*/

    /*DG.Tweening.DOTweenModuleUtils+Physics start.*/
    $m("DG.Tweening.DOTweenModuleUtils.Physics", function () { return {"td":$n[8].DOTweenModuleUtils,"att":1048962,"a":2,"s":true,"m":[{"a":2,"n":"CreateDOTweenPathTween","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].MonoBehaviour,"ps":0},{"n":"tweenRigidbody","pt":$n[1].Boolean,"ps":1},{"n":"isLocal","pt":$n[1].Boolean,"ps":2},{"n":"path","pt":$n[9].Path,"ps":3},{"n":"duration","pt":$n[1].Single,"ps":4},{"n":"pathMode","pt":$n[8].PathMode,"ps":5}],"sn":"CreateDOTweenPathTween","rt":$n[7].TweenerCore$3(UnityEngine.Vector3,DG.Tweening.Plugins.Core.PathCore.Path,DG.Tweening.Plugins.Options.PathOptions),"p":[$n[0].MonoBehaviour,$n[1].Boolean,$n[1].Boolean,$n[9].Path,$n[1].Single,$n[8].PathMode]},{"a":2,"n":"HasRigidbody","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Component,"ps":0}],"sn":"HasRigidbody","rt":$n[1].Boolean,"p":[$n[0].Component],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"HasRigidbody2D","is":true,"t":8,"pi":[{"n":"target","pt":$n[0].Component,"ps":0}],"sn":"HasRigidbody2D","rt":$n[1].Boolean,"p":[$n[0].Component],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"SetOrientationOnPath","is":true,"t":8,"pi":[{"n":"options","pt":$n[11].PathOptions,"ps":0},{"n":"t","pt":$n[8].Tween,"ps":1},{"n":"newRot","pt":$n[0].Quaternion,"ps":2},{"n":"trans","pt":$n[0].Transform,"ps":3}],"sn":"SetOrientationOnPath","rt":$n[1].Void,"p":[$n[11].PathOptions,$n[8].Tween,$n[0].Quaternion,$n[0].Transform]}]}; }, $n);
    /*DG.Tweening.DOTweenModuleUtils+Physics end.*/

    /*LumberCraft.PlayerInputController start.*/
    $m("LumberCraft.PlayerInputController", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"FixedUpdate","t":8,"sn":"FixedUpdate","rt":$n[1].Void},{"a":1,"n":"HandlePlayerInput","t":8,"sn":"HandlePlayerInput","rt":$n[1].Void},{"a":1,"n":"Start","t":8,"sn":"Start","rt":$n[1].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[1].Void},{"a":1,"n":"displayButton","t":8,"sn":"displayButton","rt":$n[2].IEnumerator},{"a":1,"n":"currentDragDistance","t":4,"rt":$n[1].Single,"sn":"currentDragDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"deviation","t":4,"rt":$n[0].Vector3,"sn":"deviation"},{"a":2,"n":"downloadNow","t":4,"rt":$n[0].GameObject,"sn":"downloadNow"},{"a":2,"n":"maxDragDistance","t":4,"rt":$n[1].Single,"sn":"maxDragDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"mouseCurrentPos","t":4,"rt":$n[0].Vector3,"sn":"mouseCurrentPos"},{"a":1,"n":"mouseStartPos","t":4,"rt":$n[0].Vector3,"sn":"mouseStartPos"},{"a":1,"n":"move","t":4,"rt":$n[1].Boolean,"sn":"move","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"moveDirection","t":4,"rt":$n[0].Vector3,"sn":"moveDirection"},{"at":[new UnityEngine.RangeAttribute(0.0, 1.0)],"a":2,"n":"movemenetSmoothing","t":4,"rt":$n[1].Single,"sn":"movemenetSmoothing","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"player","t":4,"rt":PlayerController,"sn":"player"},{"at":[new UnityEngine.RangeAttribute(0.0, 1.0)],"a":2,"n":"rotationSmoothing","t":4,"rt":$n[1].Single,"sn":"rotationSmoothing","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"speed","t":4,"rt":$n[1].Single,"sn":"speed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"targetDirection","t":4,"rt":$n[0].Vector3,"sn":"targetDirection"}]}; }, $n);
    /*LumberCraft.PlayerInputController end.*/

});
