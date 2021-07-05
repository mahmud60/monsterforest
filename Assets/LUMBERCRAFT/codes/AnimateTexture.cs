using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AnimateTexture : MonoBehaviour
{
    // Scroll main texture based on time

    public float scrollSpeedX;
    public float scrollSpeedY;
    Renderer rend;

    void Start()
    {
        rend = GetComponent<Renderer>();
    }
    private void FixedUpdate()
    {
        float offsetX = Time.time * scrollSpeedX;
        float offsetY = Time.time * scrollSpeedY;
        rend.material.SetTextureOffset("_MainTex", new Vector2(offsetX, offsetY));
    }

}
