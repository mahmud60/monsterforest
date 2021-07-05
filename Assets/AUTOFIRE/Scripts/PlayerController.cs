using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;
using TMPro;

public class PlayerController : MonoBehaviour
{
    [HideInInspector] public Animator anim;
    [HideInInspector] public Rigidbody rb;
    public LayerMask clickable;
    //public NavMeshAgent myAgent;
    public bool running;
    public bool dead;
    public float tapDelay=0;
    bool tapped;
    public float footstepDelay = 0;
    [Header("Player Stats")]
    [HideInInspector] public string healthKey = "healthkey";
    public int health;
    public int maxHealth;


    [Header("Shooting")]
    public GameObject bullet;
    public GameObject bulletForTrippleShoot;
    public float shootDelay;
    public float shootDelayMax;
    public Transform[] firePoints;
    public Transform shellPoint;
    public GameObject bulletShellPrefab;
    public bool canShoot;
    public GameObject[] enemies;
    public GameObject closestEnemy;
    public bool enemyContact;
    public GameObject muzzleFlash;
    private Transform target;

    public float range = 15f;

    [Header("POWER UPS!")]
    [Header("Shield")]
    public GameObject shieldPrefab;
    public GameObject shieldPickup;
    public bool hasShield;
    public GameObject playerShield;
    public int shieldLevel;
    [Header("Triple Shoot")]
    public bool hasTripleShoot;
    public float tripleShootTimer;
    public float tripleShootTimerMax;
    [Header("LumberCraft")]
    public GameObject axeCollider;
    public GameObject slashFX;
    public GameObject axeAnim;
    public float woodPickRange = 5f;
    [Header("Wood Stacking")]
    public GameObject woodStackParent;
    public GameObject[] woodStack;
    bool building;

    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody>();
        anim = GetComponentInChildren<Animator>();
        //myAgent = GetComponent<NavMeshAgent>();
        closestEnemy = null;
        enemyContact = false;
        canShoot = false;

        Debug.Log(anim);

        tripleShootTimer = tripleShootTimerMax;
        GetPlayerHealth();
        InitEmptyStack();

    }

    private void OnEnable()
    {
        //Time.timeScale = 1;
    }
    // Update is called once per frame
    void Update()
    {
        if (!GameManager.instance.startGame) return;
        if (dead) return;

        if (canShoot)
            AutoShoot();

        if (closestEnemy == null)
        {
            //anim.SetBool("shoot", false);
            canShoot = false;
            muzzleFlash.SetActive(false);
        }

        if(playerShield != null)
            playerShield.transform.Rotate((Vector3.up * 200 * Time.deltaTime));

        if (hasTripleShoot)
        {
            tripleShootTimer -= Time.deltaTime;
            if (tripleShootTimer <= 0)
            {
                hasTripleShoot = false;
                tripleShootTimer = tripleShootTimerMax;
            }
                
        }
    }

    private void OnDrawGizmos()
    {
        Gizmos.DrawWireSphere(transform.position, range);
        Gizmos.color = Color.red;
    }


    private void OnTriggerEnter(Collider other)
    {

        if (!dead)
        {

            if (other.gameObject.CompareTag("Coin"))
            {
                GameManager.instance.GiveCoin(1);
                Destroy(other.gameObject);
                SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.coinPickSFX);
            }

            if (other.gameObject.CompareTag("enemyProjectile") && !hasShield)
            {
                TakeDamage(2);

                Destroy(other.gameObject);
            }
            if (other.gameObject.CompareTag("bomb"))
            {
                TakeDamage(20);
                GameObject pop = Instantiate(GameManager.instance.hitFX, transform.position, Quaternion.identity);
                pop.transform.localScale *= 2;
                Destroy(other.gameObject);
            }
            if (other.gameObject.CompareTag("enemySniperProjectile") && !hasShield)
            {
                TakeDamage(10);

                Destroy(other.gameObject);

                Camera.main.transform.DOShakeRotation(0.45f, 1, 10, 90);
            }

            if (other.gameObject.CompareTag("playerShieldPickup") && !hasShield)
            {
                shieldLevel = 2;
                hasShield = true;
                GameObject shieldIns = Instantiate(shieldPrefab, transform.position, shieldPrefab.transform.rotation);
                shieldIns.transform.parent = transform;
                playerShield = shieldIns;
                Destroy(other.gameObject);
                SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.tripleFirePickSFX);
            }

            if (other.gameObject.CompareTag("TripleShootPickup") && !hasTripleShoot)
            {
                hasTripleShoot = true;
                Destroy(other.gameObject);
                SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.tripleFirePickSFX);
            }

            if (other.gameObject.CompareTag("playerHealthPickup"))
            {
                if (health < maxHealth - 30)
                {
                    health += 30;
                    PlayerPrefs.SetInt(healthKey, health);
                    UIManager.instance.healthBar.fillAmount = (float)health / (float)maxHealth;
                    Destroy(other.gameObject);
                    SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.healthPickSFX);
                }
                else
                {
                    health = maxHealth;
                    PlayerPrefs.SetInt(healthKey, health);
                    UIManager.instance.healthBar.fillAmount = (float)health / (float)maxHealth;
                    Destroy(other.gameObject);
                    SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.healthPickSFX);
                }
            }


            if (other.gameObject.CompareTag("coin"))
            {
                GameManager.instance.GiveCoin(10);
                Destroy(other.gameObject);
                SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.coinPickSFX);
            }

            if (other.gameObject.CompareTag("levelendportal"))
            {
                //GameManager.instance.LevelCompleteUponEnteringPortal();
            }
            if (other.gameObject.CompareTag("treeWood") && !dead)
            {
                //stransform.DOLookAt(other.gameObject.transform.position, 0.2f);
                //axeAnim.GetComponent<Animator>().SetTrigger("axeSlash");
                anim.GetComponent<Animator>().SetTrigger("chop");
                StartCoroutine(AxeColliderRoutine(other.gameObject));
                slashFX.GetComponent<ParticleSystem>().Play();
                //Destroy(other.gameObject);
            }
            if (other.gameObject.CompareTag("metalSource") && !dead)
            {
                //transform.DOLookAt(other.gameObject.transform.position, 0.2f);
                //axeAnim.GetComponent<Animator>().SetTrigger("axeSlash");
                anim.GetComponent<Animator>().SetTrigger("chop");
                StartCoroutine(AxeColliderRoutine(other.gameObject));
                slashFX.GetComponent<ParticleSystem>().Play();
                //Destroy(other.gameObject);
            }
        }
    }

    private void OnTriggerStay(Collider other)
    {
        if (!dead)
        {
            if (other.gameObject.CompareTag("bot"))
            {
                closestEnemy = GetClosestEnemy();
                enemyContact = true;
                canShoot = true;
                transform.DOLookAt(closestEnemy.transform.position, 0.25f);
            }
            if (other.gameObject.CompareTag("triggerZone") && !building && !dead)
            {
                StartCoroutine(BuildRoutine(other.gameObject));


            }
        }

    }
    public IEnumerator BuildRoutine(GameObject other)
    {
        building = true;
        yield return new WaitForSeconds(0.125f);
        //building home
        var buildControl = other.gameObject.GetComponentInParent<BuildingController>();
        if (buildControl.requiredWood <= GameManager.instance.totalWood)
        {
            SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.buildProcessSFX);
            buildControl.requiredWood--;
            //buildControl.txtReqWood.text = buildControl.requiredWood.ToString();
            GameManager.instance.totalWood--;
            //UIManager.instance.txtWoodCountInGame.text = GameManager.instance.totalWood.ToString();

            GameObject woodLogIns = Instantiate(GameManager.instance.woodLogPrefab, transform.position, GameManager.instance.woodLogPrefab.transform.rotation);
            woodLogIns.transform.DOMove(other.gameObject.transform.parent.position, 0.5f).OnComplete(() =>
            {
                Destroy(woodLogIns);
            });

            //temp solution
            if (buildControl.requiredWood == 15)
            {
                buildControl.buildStages[0].SetActive(true);
            }
            if (buildControl.requiredWood == 10)
            {
                buildControl.buildStages[1].SetActive(true);
            }
            if (buildControl.requiredWood == 5)
            {
                buildControl.buildStages[2].SetActive(true);
            }
            if (buildControl.requiredWood == 0)
            {
                buildControl.buildStages[3].SetActive(true);
                buildControl.isComplete = true;
            }

            if (buildControl.requiredWood <= 0)
            {
                //upon build completion
              
                GameObject conFX = Instantiate(GameManager.instance.confettiFX[0], buildControl.transform.position, GameManager.instance.confettiFX[0].transform.rotation);
                Destroy(conFX, 10f);
                GameObject conFX2 = Instantiate(GameManager.instance.confettiFX[1], buildControl.transform.position, GameManager.instance.confettiFX[1].transform.rotation);
                Destroy(conFX2, 10f);
                GameObject conFX3 = Instantiate(GameManager.instance.confettiFX[2], buildControl.transform.position, GameManager.instance.confettiFX[2].transform.rotation);
                Destroy(conFX3, 10f);

                SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.buildCompleteSFX);
                Destroy(other.gameObject);
                buildControl.buildCanvas.SetActive(false);
                
                gameObject.GetComponent<LumberCraft.PlayerInputController>().enabled = false;
                anim.enabled = false;
                for (int i = 0; i < GameManager.instance.arrows.Length; i++)
                {
                    GameManager.instance.arrows[i].SetActive(false);
                }
             
                GameManager.instance.victory = true;
                GameManager.instance.botSpawner.SetActive(false);
                GameManager.instance.mainCam.GetComponent<CameraController>().enabled = false;
                GameManager.instance.mainCam.transform.DOMove(GameManager.instance.endCamPos.transform.position, 0.5f);
                GameManager.instance.mainCam.transform.DORotateQuaternion(GameManager.instance.endCamPos.transform.rotation, 0.5f).OnComplete(()=>
                {
                    if (GameManager.instance.gameOverPanelStatus == GameOverPanelStatus.on)
                    {
                        UIManager.instance.gameoverWinPanel.SetActive(true);
                        UIManager.instance.gamePanel.SetActive(false);
                    }    
                    else if (GameManager.instance.gameOverPanelStatus == GameOverPanelStatus.off)
                        UIManager.instance.OpenCTAPanelCallback();
                });
                enabled = false;
            }
        }
        building = false;
    }
    private void OnTriggerExit(Collider other)
    {
        if (!dead)
        {
            if (other.gameObject.CompareTag("bot"))
            {
                enemyContact = false;
                canShoot = false;
                muzzleFlash.SetActive(false);
                anim.SetBool("shoot", false);
            }
        }

    }
    private void OnCollisionEnter(Collision other)
    {
        if (!dead)
        {
            if (other.gameObject.CompareTag("pickupWood"))
            {
                GameManager.instance.GiveWood(2);
                WoodStackManagement();
                Destroy(other.gameObject);
            }
            if (other.gameObject.CompareTag("pickupMetal"))
            {
                //GameManager.instance.GiveWood(1);
                //WoodStackManagement();
                //UIManager.instance.txtWoodCountInGame.text = GameManager.instance.totalWood.ToString();
                Destroy(other.gameObject);
            }
            if (other.gameObject.CompareTag("bot"))
            {
                TakeDamage(2);
            }
        }

    }
    void InitEmptyStack()
    {
        for (int i = 0; i < woodStack.Length; i++)
        {
            woodStack[i].SetActive(false);
        }
    }
    public void WoodStackManagement()
    {
        int woodIndex = GameManager.instance.ingameWoodCount / 5;

            for (int i = 0; i < woodStack.Length; i++)
            {
                if(woodIndex < woodStack.Length)
                {
                    woodStack[woodIndex].SetActive(true);
                }
            }
        
    }
    public IEnumerator AxeColliderRoutine(GameObject x)
    {
        yield return new WaitForSeconds(0.25f);

        if (x.CompareTag("treeWood"))
        {
            //Camera.main.transform.DOShakeRotation(0.5f, 0.5f);
            x.transform.parent.GetComponent<TreeController>().leafFX.GetComponent<ParticleSystem>().Play();
            GameObject pop = Instantiate(GameManager.instance.hitTreeFX, x.transform.position, Quaternion.identity);
            Destroy(pop, 1f);
            Instantiate(GameManager.instance.woodPickupPrefab, x.transform.position, GameManager.instance.woodPickupPrefab.transform.rotation);
            SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.GetRandomTreeCutSFX());
            axeCollider.SetActive(false);
            //wood health
            x.GetComponent<Farmable>().sourceHealth--;
            if (x.GetComponent<Farmable>().sourceHealth <= 0)
            {
                x.GetComponentInParent<TreeController>().treeHealth--;
                GameObject treetop = x.GetComponentInParent<TreeController>().treeTop;
                treetop.transform.DOScaleX(treetop.transform.localScale.x - 0.5f, 0.1f);
                treetop.transform.DOScaleZ(treetop.transform.localScale.z - 0.5f, 0.1f);
                if (x.GetComponentInParent<TreeController>().treeHealth <= 0)
                {
                    treetop.GetComponent<BoxCollider>().enabled = false;
                }
                Destroy(x);
            }

            yield return new WaitForSeconds(0.5f);
            axeCollider.SetActive(true);
        }
        if (x.CompareTag("metalSource"))
        {
            //Camera.main.transform.DOShakeRotation(0.5f, 0.5f);
            //x.transform.DOShakePosition(0.2f,0.2f);

            SpawnPickupable(x);
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
            axeCollider.SetActive(false);
            //source health
            x.GetComponent<Farmable>().sourceHealth--;
            if (x.GetComponent<Farmable>().sourceHealth == 2)
            {
                x.transform.DOScale(new Vector3(x.transform.localScale.x - 0.05f, x.transform.localScale.y - 0.05f, x.transform.localScale.z - 0.1f) , 0.2f);
            }
            if (x.GetComponent<Farmable>().sourceHealth <= 0)
            {
                SpawnPickupable5Stack(x);
                Destroy(x);
            }

            yield return new WaitForSeconds(0.5f);
            axeCollider.SetActive(true);
        }

    }
    void SpawnPickupable(GameObject x)
    {
        if (x.GetComponent<Farmable>().resourceType == ResourceType.gold)
        {
            GameObject goldIns = Instantiate(GameManager.instance.resourcePickupPrefabs[0], x.transform.position, GameManager.instance.resourcePickupPrefabs[0].transform.rotation);
            goldIns.transform.DOMoveY(goldIns.transform.position.y + 4, 0.2f);
        }
        if (x.GetComponent<Farmable>().resourceType == ResourceType.silver)
        {   
            GameObject silverIns = Instantiate(GameManager.instance.resourcePickupPrefabs[1], x.transform.position, GameManager.instance.resourcePickupPrefabs[1].transform.rotation);
            silverIns.transform.DOMoveY(silverIns.transform.position.y + 4, 0.2f);
        }
        if (x.GetComponent<Farmable>().resourceType == ResourceType.diamond)
        {
            GameObject diamIns = Instantiate(GameManager.instance.resourcePickupPrefabs[2], x.transform.position, GameManager.instance.resourcePickupPrefabs[2].transform.rotation);
            diamIns.transform.DOMoveY(diamIns.transform.position.y + 4, 0.2f);
        }
    }
    void SpawnPickupable5Stack(GameObject x)
    {
        if (x.GetComponent<Farmable>().resourceType == ResourceType.gold)
        {
            GameObject goldIns = Instantiate(GameManager.instance.resourcePickup5StacksPrefabs[0], x.transform.position, GameManager.instance.resourcePickup5StacksPrefabs[0].transform.rotation);
            goldIns.transform.DOMoveY(goldIns.transform.position.y + 4, 0.2f);
        }
        if (x.GetComponent<Farmable>().resourceType == ResourceType.silver)
        {
            GameObject silverIns = Instantiate(GameManager.instance.resourcePickup5StacksPrefabs[1], x.transform.position, GameManager.instance.resourcePickup5StacksPrefabs[1].transform.rotation);
            silverIns.transform.DOMoveY(silverIns.transform.position.y + 4, 0.2f);
        }
        if (x.GetComponent<Farmable>().resourceType == ResourceType.diamond)
        {
            GameObject diamIns = Instantiate(GameManager.instance.resourcePickup5StacksPrefabs[2], x.transform.position, GameManager.instance.resourcePickup5StacksPrefabs[2].transform.rotation);
            diamIns.transform.DOMoveY(diamIns.transform.position.y + 4, 0.2f);
        }
    }
    public void AutoShoot()
    {
        shootDelay += Time.deltaTime;
        if (shootDelay >= shootDelayMax && !dead)
        {
            anim.SetBool("shoot",true);
            muzzleFlash.SetActive(true);
                

            GameObject bshellIns = Instantiate(bulletShellPrefab, shellPoint.position, shellPoint.rotation);
            //bshellIns.GetComponent<Rigidbody>().AddExplosionForce(100f,Vector3.right * 50,50,50,ForceMode.Impulse);
            Destroy(bshellIns, 1.5f);
            shootDelay = 0;

            SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.GetRandomShootSFX());

            //triple shoot power up
            if (hasTripleShoot)
            {
                GameObject bulletDRIns = Instantiate(bulletForTrippleShoot, firePoints[0].position, firePoints[0].rotation);
                Destroy(bulletDRIns, 3f);
                GameObject bulletDRInss = Instantiate(bulletForTrippleShoot, firePoints[1].position, firePoints[1].rotation);
                Destroy(bulletDRInss, 3f);
                GameObject bulletDLIns = Instantiate(bulletForTrippleShoot, firePoints[2].position, firePoints[2].rotation);
                Destroy(bulletDLIns, 3f);
            }
            else
            {
                GameObject bulletIns = Instantiate(bullet, firePoints[0].position, firePoints[0].rotation);
                Destroy(bulletIns, 3f);
                PlayerBullet b = bulletIns.GetComponent<PlayerBullet>();

                if (b != null)
                    b.GetTarget(target);
            }
    
        }
    }
    public GameObject GetClosestEnemy()
    {
        enemies = GameObject.FindGameObjectsWithTag("bot");
        float closestDistance = Mathf.Infinity;
        GameObject tran = null;

        foreach (GameObject go in enemies)
        {
            float currentDistance;
            currentDistance = Vector3.Distance(transform.position, go.transform.position);
            if (currentDistance < closestDistance)
            {
                closestDistance = currentDistance;
                tran = go;

            }
        }

        if (tran != null && closestDistance <= range)
        {
            target = tran.transform;
        }
        else
            target = null;

        return tran;
    }
    public void TakeDamage(int dmg)
    {
        health -= dmg;
        PlayerPrefs.SetInt(healthKey,health);
        UIManager.instance.healthBar.fillAmount = (float)health / (float)maxHealth;
        if (health <= 0)
        {
            PlayerDeath();
        }

        GameObject dmgPop = Instantiate(GameManager.instance.dmgTextPopupPrefab, transform.position, Quaternion.identity);
        dmgPop.transform.GetComponent<TextMeshPro>().text = "-" + dmg * 10;
        //dmgPop.transform.GetComponent<TextMeshPro>().DOFade(50, .3f);
        dmgPop.transform.DOMoveY(dmgPop.transform.position.y + 2, 0.3f);
        Destroy(dmgPop, 0.3f);
    }
    public void PlayerDeath()
    {
        SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.loseSFX);
        anim.SetTrigger("die");
        dead = true;
        //StartCoroutine(AnimOffRoutine());
       
        woodStackParent.SetActive(false);

        enabled = false;
        gameObject.GetComponent<LumberCraft.PlayerInputController>().enabled = false;
        //myAgent.enabled = false;
        muzzleFlash.SetActive(false);
        if (GameManager.instance.gameOverPanelStatus == GameOverPanelStatus.on)
        {
            UIManager.instance.gameoverLosePanel.SetActive(true);
            UIManager.instance.gamePanel.SetActive(false);
        }
        else if (GameManager.instance.gameOverPanelStatus == GameOverPanelStatus.off)
            UIManager.instance.OpenCTAPanelCallback();
        rb.isKinematic = true;

    }

    public void CompleteLevel()
    {
        anim.SetTrigger("die");
        dead = true;
        enabled = false;
        //myAgent.enabled = false;
        rb.isKinematic = true;
        muzzleFlash.SetActive(false);
        UIManager.instance.gamePanel.SetActive(false);
        UIManager.instance.levelCompletePanel.SetActive(true);
    }

    public void GetPlayerHealth()
    {
        //health = PlayerPrefs.GetInt(healthKey, maxHealth);
        health = maxHealth;
        UIManager.instance.healthBar.fillAmount = (float)health / (float)maxHealth;
    }
    IEnumerator AnimOffRoutine()
    {
        yield return new WaitForSeconds(1.1f);
        anim.enabled = false;
        gameObject.GetComponentInChildren<Animator>().enabled = false;
        //Time.timeScale = 0;
    }
}