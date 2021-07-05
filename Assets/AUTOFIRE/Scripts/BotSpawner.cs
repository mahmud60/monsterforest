using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;

public class BotSpawner : MonoBehaviour
{
    public static BotSpawner instance;
    public Transform[] enemySpawnPoint;
    public GameObject[] enemy;
    public float sec;
    public float downvalue;
    public float upduration;
    public float adjustvalue;
    public float spawnTime;
    public float spawnTimeMax;
    public int enemyCount;
    public int enemyCountMax;
    public GameObject enemy_cloner;
    public Material clonerMat;
    private int[] enemyPosRandom;
    private int counter;
    public static int possibleLimit;
    private void Awake()
    {
        if (instance == null) instance = this;
    }
    // Start is called before the first frame update
    void Start()
    {
        possibleLimit = 0;
        counter = 0;
        enemyPosRandom = UniqueRandomNumber(0, enemySpawnPoint.Length);
        SpawnTimerController();
    }

    // Update is called once per frame
    void Update()
    {
        if (!GameManager.instance.startGame) return;
        if (GameManager.instance.playerCon.dead) return;
        if (GameManager.instance.victory) return;
        //if (!GameManager.instance.gameStart) return;
        if(enemyCount <= enemyCountMax)
        {
            spawnTime += Time.deltaTime;
            if (spawnTime >= spawnTimeMax)
            {
                if(counter <= enemySpawnPoint.Length-1)
                {
                    enemyCount++;
                    Vector3 downpos = new Vector3(enemySpawnPoint[enemyPosRandom[counter]].position.x, enemySpawnPoint[enemyPosRandom[counter]].position.y - downvalue, enemySpawnPoint[enemyPosRandom[counter]].position.z);

                    GameObject botIns = Instantiate(enemy[Random.Range(0, enemy.Length)], downpos, Quaternion.identity, transform);
                    string botname = botIns.name;
                    if(botname == "botBomber(Clone)")
                    {
                        botIns.transform.DOMoveY(enemySpawnPoint[enemyPosRandom[counter]].position.y + adjustvalue, upduration);
                    }
                    else
                    {
                        botIns.transform.DOMoveY(enemySpawnPoint[enemyPosRandom[counter]].position.y, upduration);
                    }
                    
                    GameObject effect = enemySpawnPoint[enemyPosRandom[counter]].GetChild(0).gameObject;
                    effect.SetActive(true);
                    StartCoroutine(EffectOffEnemy(effect));
                    spawnTime = 0;
                    counter += 1;

                }
                else
                {
                    if(counter == possibleLimit)
                    {
                        enemyPosRandom = UniqueRandomNumber(0, enemySpawnPoint.Length);
                        possibleLimit = 0;
                        counter = 0;
                    }
                }

            }
        }
        
    }

    private int[] UniqueRandomNumber(int startNo, int size)
    {
        int[] arr = new int[size];
        int value = startNo;
        for (int i = 0; i < arr.Length; i++)
        {
            arr[i] = value;
            ++value;
        }
        int rand, temp;
        for (int i = 0; i < arr.Length; i++)
        {
            rand = Random.Range(0, arr.Length);
            temp = arr[rand];
            arr[rand] = arr[i];
            arr[i] = temp;
        }

        return arr;

    }


    public void SpawnTimerController()
    {
        //spawnTimeMax = 5;
        //spawnTimeMax = 5 - ((float)GameManager.instance.worldID / 2) - (float)GameManager.instance.levelID * 0.1f;

        //if (spawnTimeMax <= 1) spawnTimeMax = 1;
    }

    IEnumerator EffectOffEnemy(GameObject go)
    {
        yield return new WaitForSeconds(sec);
        go.SetActive(false);
    }
}

