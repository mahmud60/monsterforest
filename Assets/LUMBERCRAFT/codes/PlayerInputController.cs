using System.Collections;
using System.Collections.Generic;
using UnityEngine;
namespace LumberCraft
{
    public class PlayerInputController : MonoBehaviour
    {
        private PlayerController player;
        public float speed = 6f;
        [Range(0f, 1f)]
        public float movemenetSmoothing = .5f;
        [Range(0f, 1f)]
        public float rotationSmoothing = .25f;
        private Vector3 mouseCurrentPos;
        private Vector3 mouseStartPos;
        private Vector3 moveDirection;
        private Vector3 targetDirection;
        private Vector3 deviation;
        private float currentDragDistance;
        public float maxDragDistance = 10f;
        private bool move;

        public GameObject downloadNow;

        void Start()
        {
            this.player = GetComponent<PlayerController>();
        }

        void Update()
        {
            if (!GameManager.instance.startGame) return;
            if (player.dead) return;

            HandlePlayerInput();
        }

        void FixedUpdate()
        {
            if (move)
            {
                deviation = targetDirection * speed * Time.fixedDeltaTime;
                player.rb.MovePosition(player.rb.position + deviation);
                if (!player.enemyContact)
                {
                    if (targetDirection != Vector3.zero)
                    {
                        Quaternion targetRotation = Quaternion.LookRotation(targetDirection);
                        if (transform.rotation != targetRotation)
                        {
                            //transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotationSmoothing);
                            //player.rb.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotationSmoothing);
                            player.rb.MoveRotation(Quaternion.Slerp(transform.rotation, targetRotation, rotationSmoothing));
                        }
                    }
                }
            }
        }

        IEnumerator displayButton()
        {
            yield return new WaitForSeconds(4f);
            downloadNow.SetActive(true);
        }

        private void HandlePlayerInput()
        {
            mouseCurrentPos = Input.mousePosition;
            if (Input.GetMouseButtonDown(0))
            {
                mouseStartPos = mouseCurrentPos;
                if (!UIManager.instance.howtoPlayTapped)
                {
                    GameManager.instance.startGame = true;
                    UIManager.instance.tutorial.SetActive(false);
                    UIManager.instance.howtoPlayTapped = true;
                    StartCoroutine(displayButton());
                }
            }
            else if (Input.GetMouseButton(0) && !player.dead)
            {
                currentDragDistance = (mouseCurrentPos - mouseStartPos).magnitude;

                if (currentDragDistance > maxDragDistance)
                {
                    //mouseStartPos = mouseCurrentPos - moveDirection * maxDragDistance;
                }
                move = true;
                moveDirection = (mouseCurrentPos - mouseStartPos).normalized;
                targetDirection = new Vector3(moveDirection.x, 0, moveDirection.y);
                //transform.position += deviation;          
                player.anim.SetBool("run", true);
                //player.SimulateFootsteps();
                player.footstepDelay += Time.deltaTime;
                if (player.footstepDelay >= 0.3f)
                {
                    SoundManager.sharedInstance.PlaySFX(SoundManager.sharedInstance.footstepSFX);
                    player.footstepDelay = 0;
                }
            }
            else if (Input.GetMouseButtonUp(0))
            {
                move = false;
                player.anim.SetBool("run", false);
            }
        }
    }
}