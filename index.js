const learnMenu = document.querySelectorAll(".learn");
const subMenus = document.querySelectorAll(".submenu");
const hamburgerMenu = document.querySelector(".fa-bars");
const more = document.querySelectorAll(".more");
const moreText = document.querySelectorAll(".more-text");
const authorName = document.querySelectorAll(".experience h3");
const menu = document.querySelector(".menu");
const closeBtn = document.querySelector('.close-btn');
const detailContent = document.querySelector("#detail-content");

learnMenu.forEach((menu, index) => {
    menu.addEventListener("click", function(event) {
        event.preventDefault();
        subMenus.forEach(subMenu => {
            subMenu.classList.remove("show");
        });
        subMenus[index].classList.toggle("show");
    });
});
hamburgerMenu.addEventListener("click", function(event){
    event.preventDefault();
    menu.classList.toggle("show");
});
closeBtn.addEventListener("click", function() {
    menu.classList.remove("show"); 
});
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        menu.classList.remove('show'); 
    }
});
more.forEach((more, index)=>{
    more.addEventListener("click", function(event){
        event.preventDefault();
        const overlay = document.getElementById('overlay');
        const content = document.getElementById('content');
        const author = document.getElementById('author');
        const moreTextContent = moreText[index].innerHTML;
        const authorNameContent = authorName[index].innerHTML;
        content.innerHTML = moreTextContent;
        author.innerHTML = authorNameContent;
        overlay.classList.add('show'); 
    })
});

function closeOverlay() {
    document.getElementById('overlay').classList.remove('show'); 
}
const params = new URLSearchParams(window.location.search);

const type = params.get('type');
if (type == "detect-accident"){
    detailContent.innerHTML = '<h2>車禍偵測</h2>\
    <h3>蒐集車禍資料</h3>\
    <p>從網路上圖片和影片蒐集車禍資料，因為希望搭載在監視器上，因此車禍資料必須為監視器角度的車禍資料，總共資料為三四百筆。</p>\
    <figure class="work-figure">\
        <img src="./images/1-3.jpg" alt="車禍圖片">\
        <img src="./images/1-5.jpg" alt="車禍圖片">\
        <figcaption>資料集示意圖</figcaption>\
    </figure>\
    <h3>使用 LabelImg 標註出車禍</h3>\
    <p>在訓練辨識車禍模型之前，首先使用 LabelImg 標註出圖片中的車禍區域。</p>\
    <h3>車禍辨識模型</h3>\
    <p>將標註完的結果按照約 8:2 的比例分為訓練集和驗證集，將這些資料放入 Yolov7 模型中進行訓練。在訓練過程中進\行參數微調。\
    然而，我們發現如果將輕微車禍的圖片放入資料集中，會導致模型容易判斷錯誤。因此，我們重新過濾了圖片，將輕微車禍從資料集中刪除，並重新標註了車禍區域。\
    最終，在 epoch 100、batch size 16 的情況下準確率最佳，準確率為 87%。</p>\
    <p>以下為訓練時的各項指標</p>\
    <div class="index">\
        <figure class="work-figure">\
            <img src="./images/1-15.png" alt="測試圖片">\
            <figcaption>各項指標圖</figcaption>\
        </figure>\
        <figure class="work-figure">\
            <img src="./images/1-16.png" alt="confusion matrix">\
            <figcaption>Confusion matrix</figcaption>\
        </figure>\
    </div>\
    <figure class="work-figure">\
        <img src="./images/1-4.jpg" alt="測試圖片">\
        <figcaption>測試圖片</figcaption>\
    </figure>';
}
else if (type == "cross-tracking"){
    detailContent.innerHTML = '<h2>車輛跨鏡追蹤</h2>\
    <h3>車輛跨鏡追蹤資料集</h3>\
    <p>資料集為 <a href="https://qmul-vric.github.io/">VRIC dataset</a>，包含60,430 張車輛圖像，擁有5,622 個車輛，資料集為解析度低、模糊、不同角度的車輛圖片，擁有在白天和夜間的不同道路交通場景</p>\
    <figure class="work-figure">\
        <img src="./images/1-12.png" alt="VRIC 資料集示意圖">\
        <figcaption>VRIC 資料集示意圖</figcaption>\
    </figure>\
    <h3>實作概念</h3>\
    <p>每個監視器中都會拍下各車輛照片，如果在發生車禍後，找尋當下的監視器編號，並且往前推附近的監視器畫面，將畫面中所有車輛進行重辨識，找出最相符的車輛，再進行之後的車牌辨識。</p>\
    <h3>實作步驟</h3>\
    <p>偵測到車禍後 → 回傳發生地點 (經緯度或 cam 編號) 並紀錄車禍的車輛 → 利用地點搜尋附近監視器 → 使用車輛辨識模型辨識出一秒前保存畫面中所有車輛，並紀錄這些車輛 → 使用 ReID 模型將車禍車輛與附近畫面中所有車輛進行重辨識 → 將分數最高的車輛進行車牌辨識。</p>\
    <h4>偵測到車禍後 → 回傳發生地點 (經緯度或 cam 編號) 並紀錄車禍的車輛</h4>\
    <h4>利用地點搜尋附近監視器</h4>\
    <h4>車輛辨識模型辨識</h4>\
    <h4>ReID 模型進行重辨識 → 將分數最高的車輛進行車牌辨識</h4>\
    <p>運用 <a href="https://github.com/regob/vehicle_reid">vehicle_reid repo</a> 訓練 ReID 模型，訓練結果如下所示</p>\
    <figure class="work-figure">\
        <img src="./images/1-13.jpg" alt="各項指標">\
        <figcaption>各項指標</figcaption>\
    </figure>\
    <p>模型測試方法為給定一張目標車輛圖片，與多張其他車輛圖片進行比對，其中包括一張正確車輛的圖片。每張車輛圖片下方顯示的數字為比對分數，分數越高表示車輛相似性越高。綠框標示的是分數最高的車輛。</p>\
    <figure class="work-figure">\
        <img src="./images/1-14.png" alt="ReID 測試圖片">\
        <figcaption>ReID 測試圖片</figcaption>\
    </figure>\
    ';
}
else if (type == "license-plate-recognition"){
    detailContent.innerHTML = '<h2>車牌辨識</h2>\
    <h3>車牌資料集</h3>\
    <p>資料集為 AOLP(Application Oriented License Plate) 資料集，資料分別有 AC(停車場出入口)、RP(路邊拍攝) 和 LE(交通監控) 三種不同場景下的資料，並且各類別中也有白天和晚上的資料，總共三千筆左右資料。</p>\
    <figure class="work-figure">\
        <img src="./images/1-6.png" alt="車牌資料集" style="width:90%;">\
        <figcaption>車牌辨識資料集示意圖</figcaption>\
    </figure>\
    <h3>使用 Yolov7 偵測車牌位置</h3>\
    <p>在訓練之前，首先使用 LabelImg 標註出圖片中的車牌區域，並訓練 Yolov7 模型。各項指標如下圖所示:</p>\
    <p>recision (左上)： 橫軸表示訓練的epoch；縱軸表示精度 (Precision)，精度隨著訓練次數增加而逐漸上升並穩定在高水平，表示模型預測為車牌的區域中大部分是正確的。\
    Recall (右上)：\
    橫軸表示訓練的 epoch；縱軸表示召回率 (Recall)，召回率隨著訓練次數增加而迅速上升並穩定在高水平，表示大部分實際存在的車牌區域都被模型成功檢測出來。</p>\
    <figure class="work-figure">\
        <img src="./images/1-8.jpg" alt="Precision 與 Recall 指標">\
        <figcaption>Precision 與 Recall 指標</figcaption>\
    </figure>\
    <p>mAP@0.5 (左下)： 橫軸表示訓練的epoch；縱軸表示在 IoU 門檻為 0.5 時的平均準確率 (mean Average Precision, mAP)，值接近1，表示模型在判斷車牌區域時非常準確。\
    mAP@0.5:0.95 (右下)： 橫軸表示訓練的 epoch；縱軸表示在 IoU 門檻從 0.5 到 0.95 的平均準確率，隨著訓練次數增加，mAP 逐漸上升並穩定，表示模型在不同 IoU 門檻下都能保持較高的準確率。</p>\
    <figure class="work-figure">\
        <img src="./images/1-9.jpg" alt="mAP@0.5 與 mAP@0.5:0.95 指標">\
        <figcaption>mAP@0.5 與 mAP@0.5:0.95 指標</figcaption>\
    </figure>\
    <p>以下為車牌位置辨識模型測試示意圖</p>\
    <figure class="work-figure">\
        <img src="./images/1-10.jpg" alt="車牌測試圖">\
        <img src="./images/1-11.jpg" alt="車牌測試圖">\
        <figcaption>車牌辨識測試示意圖</figcaption>\
    </figure>\
    <h3>使用 EasyOCR 偵測車牌號碼</h3>\
    <p>EasyOCR 是一個開源的光學字元辨識（OCR）工具，支援多種語言和文字格式，在此專題中主要用來辨識車牌號碼。</p>';
}

const backToMainBtn = document.querySelector("#back-to-main");
if (backToMainBtn){
    backToMainBtn.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "project.html#flowchart";
        setTimeout(() => {
            const target = document.querySelector("#flowchart");
            console.log(target);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }, 100); 
    });
};
