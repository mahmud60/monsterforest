using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using DG.Tweening;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
#if !UNITY_EDITOR
using Luna.Unity;
#endif

public class UIManager : MonoBehaviour
{
    public static UIManager instance;

    public GameObject panelCTA;
    public Button btnDownload;
    bool isLunaGamEndCalled;

    public GameObject gamePanel;
    public GameObject gameOverPanel;
    public GameObject levelCompletePanel;
    public Button retryBtn;
    public Button nextBtn;
    public Button homeBtn;
    public Button retryHomeBtn;
    public GameObject gameoverLosePanel;
    public GameObject gameoverWinPanel;
    public Button btnLoseNext;
    public Button btnWinNext;

    public Image healthBar;
    public Image levelProgBar;
    [Header("Start Panel")]
    public GameObject startPanel;
    public Button playBtn;
    public TextMeshProUGUI txtLevel;
    public TextMeshProUGUI txtWorld;
    public TextMeshProUGUI txtCoin;
    public TextMeshProUGUI txtWood;
    public TextMeshProUGUI txtHowtoPlay;
    [HideInInspector] public bool howtoPlayTapped;
    [Header("Game Panel")]
    public TextMeshProUGUI txtLevelGamePanel;
    public TextMeshProUGUI txtWorldGamePanel;
    public TextMeshProUGUI txtWoodCountInGame;
    public GameObject tutorial;
    //sharkWorld
    [Header("World")]
    public GameObject sharkWorldPanel;
    public Button sharkWorldBtn;
    public GameObject UICanvas;
    public List<Sprite> worldImages;
    public Image imgProdImage;
    public TextMeshProUGUI txtWorldName;
    string[] WorldName = new string[]
    {
    "Enchanted Forest",
    "Forgotten Land",
    "Death Valley",
    "Waste Land",
    "Middgard",
    "Silent Forest",
    "Spirit Hill",
    "Westerworld",
    "Badlands",
    "Hell Forest"
    };

    private void Awake()
    {
        instance = this;
        playBtn.onClick.AddListener(() => PlayBtnCallback());
        //retryBtn.onClick.AddListener(() => RetryBtnCallback());
        //nextBtn.onClick.AddListener(() => NextBtnCallback());
    }
    // Start is called before the first frame update
    void Start()
    {
        InGameProgressionText();
        GameManager.instance.startGame = true;
        SoundManager.sharedInstance.StopMainMenuAudio();
        btnDownload.onClick.AddListener(() => InstallFullGameCallback());
        btnLoseNext.onClick.AddListener(() => OpenCTAPanelCallback());
        btnWinNext.onClick.AddListener(() => OpenCTAPanelCallback());
    }
    public void PlayBtnCallback()
    {
        GameManager.instance.SetCurrentWorld();
        BotSpawner.instance.SpawnTimerController();
        startPanel.SetActive(false);
        gamePanel.SetActive(true);
        GameManager.instance.startGame = true;
        SoundManager.sharedInstance.StopMainMenuAudio();
        InGameProgressionText();
        txtWoodCountInGame.text = GameManager.instance.totalWood.ToString();
        //GameManager.instance.portalFX.transform.DOScale();
    }
    public void RetryBtnCallback()
    {
        PlayerPrefs.SetInt("Home", 0);
        SceneManager.LoadScene("GameScene");
    }

    public void NextBtnCallback()
    {
        PlayerPrefs.SetInt("Home", 0);
        SceneManager.LoadScene("GameScene");
    }

    public void HomeBtnCallback()
    {
        PlayerPrefs.SetInt("Home", 1);
        SceneManager.LoadScene("GameScene");
    }   

    public void WorldsBtnCallback()
    {

        sharkWorldPanel.SetActive(true);
        startPanel.SetActive(false);
        
    }

    public void HomeCallback()
    {
        //PlayerPrefs.SetInt("Home", 1);
        startPanel.SetActive(true);
    }

    public void UpdateWorldUI(int worldId)
    {
        txtLevel.text = "Level- " + (GameManager.instance.levelID + 1).ToString();
        txtWorld.text = "World- " + (GameManager.instance.worldID + 1).ToString();

        txtLevelGamePanel.text = "Level- " + (GameManager.instance.levelID + 1).ToString();
        txtLevelGamePanel.text = "World- " + (GameManager.instance.worldID + 1).ToString();

        imgProdImage.sprite = worldImages[worldId];
        txtWorldName.text = WorldName[worldId];
        //Debug.Log("level "+GameManager.instance.levelID);
    }
    public void InGameProgressionText()
    {
        txtLevelGamePanel.text = "Level- " + (GameManager.instance.levelID + 1).ToString();
        txtWorldGamePanel.text = "World- " + (GameManager.instance.worldID + 1).ToString();
    }
    public IEnumerator GameOverPanelDelayRoutine()
    {
        yield return new WaitForSeconds(1.5f);
        gameOverPanel.SetActive(true);
    }
    public void OpenCTAPanelCallback()
    {

#if !UNITY_EDITOR
                Playable.InstallFullGame();
#endif

        if (!isLunaGamEndCalled)
        {
            //Luna.Unity.LifeCycle.GameEnded();
            isLunaGamEndCalled = true;
        }

        panelCTA.SetActive(true);
        gamePanel.SetActive(false);
        gameoverLosePanel.SetActive(false);
        gameoverWinPanel.SetActive(false);
    }
    public void InstallFullGameCallback()
    {

#if !UNITY_EDITOR
                Playable.InstallFullGame();
#endif
    }
}
