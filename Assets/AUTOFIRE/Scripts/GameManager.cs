using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.AI;

public enum GameOverPanelStatus
{
    on,
    off
}
public enum Difficulty
{
    easy,
    hard
}
public class GameManager : MonoBehaviour, ISerializationCallbackReceiver
{
    public static GameManager instance;

    [Header("LUNA VARIABLES")]
    [SerializeField]
    //[LunaPlaygroundField("Game Over Panel Status")]
    public GameOverPanelStatus gameOverPanelStatus;
    [SerializeField]
    //[LunaPlaygroundField("Difficulty")]
    public Difficulty difficulty;
    public bool startGame;
    public bool victory;

    public GameObject player;
    public PlayerController playerCon;
    public GameObject botSpawner;
    public GameObject endCamPos;
    public GameObject mainCam;
    [SerializeField]
    [Header("Currency")]
    public static string totalcoinKey = "totalcoinKey";
    public int totalCoin;
    public GameObject coinPrefab;
    public static string totalWoodKey = "totalwoodKey";
    public int totalWood;
    public int ingameWoodCount;
    public static string totalGoldKey = "totalgoldKey";
    public int totalGold;
    public static string totalSilverKey = "totalsilverKey";
    public int totalSilver;
    public static string totalDiamondKey = "totaldiamondKey";
    public int totalDiamond;

    [Header("FX")]
    public GameObject tapFX;
    public GameObject popFX;
    public GameObject hitFX;
    public GameObject hitTreeFX;
    public GameObject hitGoldFX;
    public GameObject hitSilverFX;
    public GameObject hitDiamondFX;
    public GameObject portalPrefab;
    public GameObject dmgTextPopupPrefab;
    public GameObject woodPlusTextPopupPrefab;
    public GameObject[] confettiFX;

    [Header("Level Info")]
    public static string worldKey = "worldKey";
    public int worldID;
    public static string levelKey = "levelKey";
    public int levelID;
    public int botsKilled;
    public int botsToKill;
    [Header("World Info")]
    public GameObject[] environments;
    public GameObject[] ground;
    public Material[] groundMats;

    public static string gamelevelKey = "gamelevelKey";
    public int gameLevel;
    [Header("LumberCraft")]
    public GameObject woodPickupPrefab;
    public GameObject woodLogPrefab;
    public GameObject[] resourcePickupPrefabs;
    public GameObject[] resourcePickup5StacksPrefabs;
    public GameObject[] arrows;

    private void Awake()
    {
        instance = this;


    }
    // Start is called before the first frame update
    void Start()
    {
        //core stuff
        if (player != null)
            playerCon = player.GetComponent<PlayerController>();

        levelID = PlayerPrefs.GetInt(levelKey,0)%9;
        gameLevel = PlayerPrefs.GetInt(gamelevelKey, 0);
        worldID = PlayerPrefs.GetInt(worldKey,0);
        totalCoin = PlayerPrefs.GetInt(totalcoinKey, 0);
        totalWood = PlayerPrefs.GetInt(totalWoodKey, 0);
        UIManager.instance.UpdateWorldUI(worldID);       
        if (!PlayerPrefs.HasKey("levelCountWorld0"))
        {
            for (int i = 0; i < 10; i++)
            {
                PlayerPrefs.SetInt("levelCountWorld" + i, 0);
            }
        }

        DifficultyControl();
        FOVControl();

    }
    private void Update()
    {
        FOVControl();
    }
    public void FOVControl()
    {
        if (Screen.height / Screen.width >= 1)
        {
            //portrait
            Camera.main.fieldOfView = 70;
        }
        else
        {
            //landscape
            Camera.main.fieldOfView = 45;
        }
    }
    public void DifficultyControl()
    {
        if (difficulty == Difficulty.easy)
        {
            playerCon.maxHealth = 10;
            botSpawner.GetComponent<BotSpawner>().spawnTimeMax = 5;
            botSpawner.GetComponent<BotSpawner>().enemyCountMax = 5;
        }
        else if (difficulty == Difficulty.hard)
        {
            playerCon.maxHealth = 5;
            botSpawner.GetComponent<BotSpawner>().spawnTimeMax = 3;
            botSpawner.GetComponent<BotSpawner>().enemyCountMax = 15;
        }
    }
    public void CheckLevelProgression()
    {
        if (!victory)
        {
            botsKilled++;
            UIManager.instance.levelProgBar.fillAmount = (float)botsKilled / (float)botsToKill;
            if (botsKilled >= botsToKill)
            {
                Debug.Log("level complete");
                victory = true;
                GameObject portalIns = Instantiate(portalPrefab, new Vector3(player.transform.position.x, player.transform.position.y + 3, player.transform.position.z + 3) , portalPrefab.transform.rotation);
                SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.portalSFX);
            }
        }
    }
    public void LevelCompleteUponEnteringPortal()
    {
        gameLevel++;
        PlayerPrefs.SetInt(gamelevelKey, gameLevel);

        levelID = (levelID + 1);

        //int levelCountWorld = PlayerPrefs.GetInt("levelCountWorld" + worldID);
        PlayerPrefs.SetInt("levelCountWorld" + worldID, levelID);

      
        //health aktu barbe
        playerCon.health += 10;
        if (playerCon.health > 100)
        {
            playerCon.health = 100;
        }
        PlayerPrefs.SetInt(playerCon.healthKey, playerCon.health);
        Debug.Log("levelID "+ levelID);
        if (levelID >= 9)//world progression
        {
            PlayerPrefs.SetInt("levelCountWorld" + worldID, 0);
            worldID++;
            PlayerPrefs.SetInt(worldKey, worldID);
            levelID = 0;
            playerCon.health = playerCon.maxHealth;
            PlayerPrefs.SetInt(playerCon.healthKey, playerCon.health);
            UIManager.instance.UpdateWorldUI(worldID);

        }

        

        int maxLevelCompleted = PlayerPrefs.HasKey("maxLevelCompleted") ? PlayerPrefs.GetInt("maxLevelCompleted") : 0;

        if (maxLevelCompleted <= gameLevel)
        {
            maxLevelCompleted = gameLevel;
            PlayerPrefs.SetInt("maxLevelCompleted", maxLevelCompleted);
        }


        //coin add
        if (maxLevelCompleted % 3 == 0)
        {

            if ((maxLevelCompleted / 3) % 3 == 0)
            {
                GiveCoin(((50 + (2 * 25)) + (worldID * 50)));
               
            }
            else if ((maxLevelCompleted / 3) % 2 == 0)
            {
                GiveCoin(((50 + (1 * 25)) + (worldID * 50)));
               
            }
            else
            {
                GiveCoin((50 + (0 * 25)) + (worldID * 50));              
            }

        }



        //levelID = levelID % 9;
        PlayerPrefs.SetInt(levelKey, levelID);


        //completePanel
        if (levelID % 3 == 0)
        {
            player.GetComponent<PlayerController>().CompleteLevel();
        }
        else
        {
            UIManager.instance.NextBtnCallback();
        }


        //end of world check
        if (worldID > 9)
        {
            worldID = 0;
            PlayerPrefs.SetInt(worldKey, worldID);
        }
       

    }



    public void SetCurrentWorld()
    {
        environments[0].SetActive(true);
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

        ////world mat select
        //for (int g = 0; g < ground.Length; g++)
        //{
        //    ground[g].GetComponent<MeshRenderer>().material = groundMats[worldID/2];
        //}
        BotAmount();

        

    }
    public void BotAmount()
    {
       
        //enemy count decider
        botsToKill = 3 + worldID + levelID / 3;

        if (botsToKill > 10) botsToKill = 10;

        //Debug.LogError("botsToKill:"+ botsToKill);
    }
    public void GiveCoin(int i)
    {
        totalCoin += i;
        PlayerPrefs.SetInt(totalcoinKey, totalCoin);
    }
    public void GiveWood(int i)
    {
        ingameWoodCount+=i;
        totalWood += i;
        PlayerPrefs.SetInt(totalWoodKey, totalWood);
    }
    public void OnBeforeSerialize()
    {
        
    }

    public void OnAfterDeserialize()
    {
        
    }
}
