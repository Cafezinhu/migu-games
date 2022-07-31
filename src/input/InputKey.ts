export class InputKey {
    isPressed: boolean;
    pressedOnThisFrame: boolean;
    releasedOnThisFrame: boolean;
    status: number;

    constructor(){
        this.release();
        this.status = 0;
    }

    update(){
        if(this.status == -1){
            this.releasedOnThisFrame = true;
            this.status = 0;
        }else if(this.status == 0 && !this.isPressed){
            this.releasedOnThisFrame = false;
        }else if(this.status == 0 && this.isPressed){
            this.pressedOnThisFrame = true;
            this.status = 1;
        }else if(this.status == 1){
            this.pressedOnThisFrame = false;
            this.status = 2;
        }
    }

    press(){
        this.isPressed = true;
        this.pressedOnThisFrame = false;
        this.releasedOnThisFrame = false;
        this.status = 0;
    }

    release(){
        this.isPressed = false;
        this.pressedOnThisFrame = false;
        this.releasedOnThisFrame = false;
        this.status = -1;
    }
}