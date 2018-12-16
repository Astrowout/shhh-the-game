import Colors from '../Colors.js';

export default class Scene {
    constructor(fieldOfView, nearPlane, farPlane) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspectRatio = this.width / this.height;
        //
        this.fieldOfView = fieldOfView;
        this.nearPlane = nearPlane;
        this.farPlane = farPlane;
        //
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(this.fieldOfView, this.aspectRatio, this.nearPlane, this.farPlane);
        this.renderer = new THREE.WebGLRenderer({alhpa: true, antialias: true});
    }

    create(){
        //
    }

    update(){
        this.scene.add(this.camera);
        this.scene.background = new THREE.Color(Colors.purpleDark);
        this.renderer.setSize(this.width, this.height);
        this.renderer.shadowMap.enabled = true;
    }

    render(){
        //
    }

    loop(){
        
    }
  }