using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;
using TMPro;

public enum botClass
{
    follower,
    shooter,
    shooter4Dir,
    sniper,
    cloner,
    bomber
}
public class BotController : MonoBehaviour
{
    public botClass bc;
    Rigidbody rb;
    public int[] damage;
    public GameObject[] bulletTypes;
    //NavMeshAgent agent;
    public Transform target;
    public float lookRadius = 25f;
    public float shootRadius;
    public int health;
    public bool canAttack;
    public bool attacked;
    public bool dead;
    public float moveSpeed;

    [Header("shooter")]
    public Transform firePoint;
    public float shootDelay;
    public float shootDelayMax;
    [Header("sniper")]
    public GameObject ray;
    [Header("cloner")]
    public int cloneLevel;
    [Header("bomber")]
    public GameObject bombPrefab;
    public float bombRadius;
    public float bombDelay;
    public float bombDelayMax;

    // Start is called before the first frame update
    void Start()
    {
        //agent = GetComponent<NavMeshAgent>();

        target = GameManager.instance.player.transform;
        rb = GetComponent<Rigidbody>();
    }

    void Update()
    {
        if (!GameManager.instance.startGame) return;
        if (dead) return;
        if (GameManager.instance.playerCon.dead)
        {
            //agent.enabled = false;
            return;
        }
        if (GameManager.instance.victory) return;
        //if (!GameManager.instance.gameStart) return;

        float distance = Vector3.Distance(target.position, transform.position);
        if (distance <= lookRadius)
        {
            if (bc == botClass.follower || bc == botClass.cloner)
            {
                transform.LookAt(GameManager.instance.player.transform);
                transform.position += transform.forward * moveSpeed * Time.deltaTime;
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
        if (bc == botClass.shooter)
        {
            if (distance <= shootRadius)
            {
                transform.DOLookAt(target.position, 0.25f);
                ShootPlayer();
            }
        }
        if (bc == botClass.sniper)
        {
            if (distance <= shootRadius)
            {
                transform.DOLookAt(target.position, 0.25f);
                SnipePlayer();
            }
            else
            {
                ray.SetActive(false);
            }
        }
        if (bc == botClass.bomber)
        {
            if (distance <= bombRadius)
            {
                transform.DOLookAt(target.position, 0.25f);
                BombPlayer();
            }
        }
    }
    void FaceTarget()
    {
        Vector3 direction = (target.position - transform.position).normalized;
        Quaternion lookRotation = Quaternion.LookRotation(new Vector3(direction.x, 0, direction.z));
        transform.rotation = Quaternion.Slerp(transform.rotation, lookRotation, Time.deltaTime * 5);
    }
    private void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.red;
        Gizmos.DrawWireSphere(transform.position, lookRadius);
        Gizmos.DrawWireSphere(transform.position, shootRadius);
    }

    IEnumerator HitPlayerRoutine()
    {
        canAttack = false;
        attacked = true;

        GameManager.instance.playerCon.health -= damage[0];
        PlayerPrefs.SetInt(GameManager.instance.playerCon.healthKey, GameManager.instance.playerCon.health);
        UIManager.instance.healthBar.fillAmount = (float)GameManager.instance.playerCon.health / (float)GameManager.instance.playerCon.maxHealth;

        if (GameManager.instance.playerCon.health <= 0)
        {
            GameManager.instance.playerCon.anim.SetTrigger("die");
            GameManager.instance.playerCon.dead = true;
            GameManager.instance.playerCon.enabled = false;
            GameManager.instance.player.GetComponent<LumberCraft.PlayerInputController>().enabled = false;
            //GameManager.instance.playerCon.myAgent.enabled = false;
            GameManager.instance.playerCon.rb.isKinematic = true;
            GameManager.instance.playerCon.muzzleFlash.SetActive(false);
            UIManager.instance.gamePanel.SetActive(false);

            if (GameManager.instance.gameOverPanelStatus == GameOverPanelStatus.on)
            {
                UIManager.instance.gameoverLosePanel.SetActive(true);
                UIManager.instance.gamePanel.SetActive(false);
            }
            else if (GameManager.instance.gameOverPanelStatus == GameOverPanelStatus.off)
                UIManager.instance.OpenCTAPanelCallback();

            //StartCoroutine(UIManager.instance.GameOverPanelDelayRoutine());
            //SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.GetRandomBotkillSFX());

            //GameManager.instance.playerCon.health = GameManager.instance.playerCon.maxHealth;
            //PlayerPrefs.SetInt(GameManager.instance.playerCon.healthKey, GameManager.instance.playerCon.health);
        }
        //GetComponentInChildren<Animator>().SetTrigger("isEating");
        //UIManager.instance.hurtFrame.SetActive(true);
        //SoundManager.Instance.PlaySFX(SoundManager.Instance.hitSFX);

        yield return new WaitForSeconds(0.35f);

        //UIManager.instance.hurtFrame.SetActive(false);//fails to turn off sometimes 

        yield return new WaitForSeconds(2f);

        //UIManager.instance.hurtFrame.SetActive(false);
        canAttack = true;
        attacked = false;
    }
    private void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.CompareTag("bullet"))
        {
            int dmg = 1;
            health -= dmg;

            Destroy(other.gameObject);
            GameObject pop = Instantiate(GameManager.instance.hitFX, transform.position, Quaternion.identity);
            Destroy(pop, 1f);

            transform.DOShakeScale(0.2f, 0.15f);

            if (health <= 0)
            {
                Death();
            }

        }
    }

    public void ShootPlayer()
    {
        shootDelay += Time.deltaTime;
        if (shootDelay >= shootDelayMax)
        {
            GameObject bulletIns = Instantiate(bulletTypes[0], firePoint.position, firePoint.rotation);
            Destroy(bulletIns, 7f);
            shootDelay = 0;
            SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.enemyShootSFX);
        }
    }
    public void SnipePlayer()
    {

        shootDelay += Time.deltaTime;

        if (shootDelay >= 0.5f && shootDelay <= 1.5f)
        {
            ray.SetActive(true);
        }
        if (shootDelay >= shootDelayMax)
        {
            GameObject bulletIns = Instantiate(bulletTypes[0], firePoint.position, firePoint.rotation);
            bulletIns.GetComponent<BulletController>().speed = 25;
            Destroy(bulletIns, 7f);
            shootDelay = 0;
            SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.sniperShotSFX);

            ray.SetActive(false);
        }

    }
    public void BombPlayer()
    {
        bombDelay += Time.deltaTime;
        if (bombDelay >= bombDelayMax)
        {
            GameObject bombIns = Instantiate(bombPrefab, firePoint.position, firePoint.rotation);
            bombIns.transform.DOMoveX(target.position.x, 1.5f);
            bombIns.transform.DOMoveZ(target.position.z, 1.5f);
            bombIns.transform.DOMoveY(transform.position.y + 7, 0.5f).SetLoops(2, LoopType.Yoyo);
            bombIns.transform.GetComponent<MeshRenderer>().material.DOColor(Color.red, 2f);
            Destroy(bombIns, 7f);
            bombDelay = 0;
            SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.enemyShootSFX);
        }
    }
    public void GiveDamage()
    {

    }
    public void Death()
    {
        GameManager.instance.playerCon.enemyContact = false;
        dead = true;
        gameObject.tag = "botDead";
        gameObject.layer = 11;
        //GetComponentInChildren<Animator>().SetTrigger("isDied");
        enabled = false;
        //agent.enabled = false;
        GetComponent<Collider>().enabled = false;
        rb.useGravity = false;
        GameManager.instance.player.GetComponent<PlayerController>().canShoot = false;
        Destroy(gameObject);
        GameObject hit = Instantiate(GameManager.instance.popFX, transform.position, Quaternion.identity);
        //hit.GetComponent<ParticleSystem>().startColor=gameObject.GetComponent<MeshRenderer>().material.color;
        Destroy(hit, 1f);
        GameObject coinIns = Instantiate(GameManager.instance.coinPrefab, transform.position, GameManager.instance.coinPrefab.transform.rotation);

        Camera.main.transform.DOShakeRotation(0.35f, 1, 10, 90);

        SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.GetRandomBotkillSFX());

        if (ray != null) ray.SetActive(false);

        if (bc == botClass.cloner && cloneLevel == 0)
        {
            SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.enemyCloneSFX);

            for (int i = 0; i < 2; i++)
            {
                GameObject clone = Instantiate(BotSpawner.instance.enemy_cloner, transform.position, BotSpawner.instance.enemy_cloner.transform.rotation);
                clone.transform.localScale = new Vector3(1.5f, 2, 1.5f);
                clone.GetComponent<MeshRenderer>().material = BotSpawner.instance.clonerMat;
                clone.GetComponent<BotController>().cloneLevel = 1;
                clone.GetComponent<BotController>().health /= 2;
            }
        }
        BotSpawner.possibleLimit += 1;
        //GameManager.instance.CheckLevelProgression();

    }
}