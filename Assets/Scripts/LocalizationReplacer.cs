using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UI;

public class LocalizationReplacer : MonoBehaviour
{
    public Image MyImage;
    public Text Mytxt;
    public LocalizationImageSet[] localizationDatas;


    // Start is called before the first frame update
    void Awake()
    {
        MyImage = GetComponent<Image>();
        Mytxt = GetComponent<Text>();


        SetData();


    }

    // Update is called once per frame
    void Update()
    {

    }

    void SetData()
    {
        int i = 0;
        var systemlang = Application.systemLanguage;
        // systemlang = SystemLanguage.Japanese;
        //if (systemlang == SystemLanguage.Japanese)
        //{
        //    i = 1;
        //}

         if (systemlang == SystemLanguage.ChineseTraditional)
        {
            i = 2;
        }

        else if ((systemlang == SystemLanguage.ChineseSimplified))
        {

            i = 3;

        }
        else
        {
            i = 0;

        }
        if (i > localizationDatas.Count())
        {
            i = 0;
        }
        var data = localizationDatas[i];
        //logic for image or text
        if (MyImage != null)
        {

            SetImage(data);
        }

        else
        {

            if (Mytxt != null)
            {
                SetText(data);
            }

        }
    }
        void SetImage(LocalizationImageSet data)
        {
            if (data.Image != null)
            {
                MyImage.sprite = data.Image;
            }
        }
        void SetText(LocalizationImageSet data)
        {

            if (data.Str != null && data.Str.Length > 0)
            {
                Mytxt.text = data.Str;
            }
        }
    }

    [System.Serializable]
    public class LocalizationImageSet
    {

        public string Name;
        public Sprite Image;
        public string Str;
    }

