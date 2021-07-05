using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class BuildingController : MonoBehaviour
{
    public int requiredWood;
    public bool isComplete;
    public GameObject[] buildStages;
    public TextMeshPro txtReqWood;
    public GameObject buildCanvas;

    // Start is called before the first frame update
    void Start()
    {
        //txtReqWood.text = requiredWood.ToString();
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
