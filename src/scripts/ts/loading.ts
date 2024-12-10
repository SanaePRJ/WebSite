/*#################################################################################
   ####     ####    ##  ##    ####    ######   #####    #####      #### 
 ###   #   ## ##    ##  ##   ## ##    ##       ##  ##   ##  ##      ##  
 ##        ## ##    ### ##   ## ##    ##       ##  ##   ##  ##      ##  
  ######   ######  #### ##   ######  ######   ######   ######      ##   
      ##  ##   ##  ## ###   ##   ##  ##       ##       ####        ##   
 ##  ##   ##   ##  ##  ##   ##   ##  ##       ##       ## ##    #  ##   
  ####    ##   ##  ##  ##   ##   ##  #####    ##       ##  ###  ####    

  * Copyright 2024 SanaePRJ. All Rights Reserved.
#################################################################################*/


let concealElement: HTMLElement;
let loadingContent: HTMLElement;
let subContent    : HTMLElement;
let sanaePRJObj   : HTMLElement;

async function addSanaePRJObj(){
    sanaePRJObj           = document.createElement("div");
    let file              = await fetch("./sanaePRJObj.htm");

    sanaePRJObj.innerHTML = await file.text();

    sanaePRJObj.style.cssText +=
    `
        position : fixed;

        display   :flex;
        right     :50%;
        bottom    :30%;

        justify-content: center;
        align-items    : center;
        transform      : translate(50%, 70%);
    
        z-index : 255;
        transition : all 1s;
    `;
    document.body.appendChild(sanaePRJObj);
}
// loading を表示:コードをロードした時
document.addEventListener("DOMContentLoaded", async () => {
    concealElement = document.createElement("div");
    loadingContent = document.createElement("p");
    subContent     = document.createElement("p");

    // id 設定
    concealElement.id = "conceal";
    loadingContent.id = "conceal-content";
    subContent.id     = "conceal-subcontent";

    // Fontを適用する
    loadingContent.className = "SankofaFont";
    subContent.className     = "SankofaFont";

    // スタイル
    concealElement.style.cssText = `
        position: fixed;
        top     : 0px;
        width   : 100%;
        height  : 100%;
        background-color: white;
        z-index   : 255;
        text-align: center;
    `;
    loadingContent.style.cssText = `
        font-size: 60px;
    `;
    subContent.style.cssText = `
        font-size: 20px;
    `;
    
    // body へ適用
    concealElement.appendChild(loadingContent);
    concealElement.appendChild(subContent);
    document.body.appendChild(concealElement);

    // SanaePRJ OBJを追加
    if(location.protocol!=="file:")
        addSanaePRJObj();
    else
        alert("プロトコルがfileプロトコルであるため正常に表示されません。サーバを立ててアクセスしてください。");

    // SanaeProjectをかっこよく表示
    delayPrint("#conceal-content"   , "Sanae", 150);
    delayPrint("#conceal-content"   , "Project", 70, true);
    delayPrint("#conceal-subcontent", `"Glory in the heights above to God,<br>and on earth peace among men of goodwill."<br>Luke 2:14`, 10);

    setTimeout(function nowLoading() {
        // 読み込まれた & SanaeProject が表示されている。
        if (document.readyState === "complete" && writingElements.length === 0) {
            // 隠す
            concealElement.style.animation = "concealHide 1s forwards";
            sanaePRJObj.style.transform="translate(50%,0%)";
            sanaePRJObj.style.opacity = "0";

            // 要素削除
            setTimeout(() => { 
                concealElement.remove();
                sanaePRJObj.remove();
            }, 1000);
        }
        // 読み込み完了していない場合遅延&自分を呼び出し
        else {
            setTimeout(nowLoading, 500);
        }
    }, 1400);
});