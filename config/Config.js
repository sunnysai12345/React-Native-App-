export const AUTHCONFIG = {
    applicationId: "91bbe40c479542b3a5e200af938bf8e2c00d1dfc2ca9adef396d8cc72c098089",
    secret: "67e1a22b1bbcff0ea6006d5160933ddd508e7d7656120820ff0c8ca442a663bf",
   /*applicationId: "8439f83d66ecd9cc836585ca40b3820abbf276dd642d97cae6ea3be9ccbe3d51",
    secret: "f1ee93dd8835ae1f146076418e42622ca7ab2aa5b0a8b85a82f088869a665558",*/
    callbackUrl: "http://www.sure.com/usplash",
};

export const PERMISSIONS = [
    "public",
    "read_user",
    "write_user",
    "read_photos",
    "write_photos",
    "write_likes",
    "write_followers",
    "read_collections",
    "write_collections",
];



export class  ConfigStore  {
    constructor() {
        this.splashTime = 100;
        this.splashImg = require("../Images/splash.png");
    }

    get SplashImg() {
        return this.splashImg;
    }

    get SplashTime() {
        return this.splashTime;
    }


}