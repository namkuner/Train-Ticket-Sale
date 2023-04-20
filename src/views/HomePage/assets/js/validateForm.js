const inputSearch = document.querySelector(".input-search")
const autoBox = document.querySelector(".autobox")
const outputSearch = document.querySelector(".output-search")
const autoBox2 = document.querySelector(".autobox2")
const gatauSearch = document.querySelector(".gatau-search")
const autoBox3 = document.querySelector(".autobox3")


//Nơi đi
inputSearch.onkeyup = (e) => {
    //console.log(e.target.value)
    let checkData = e.target.value
    let dataArray = []
    if(checkData){
        dataArray = recomentlist.filter((data) => {
            return data.toLocaleLowerCase().startsWith(checkData.toLocaleLowerCase())
        })
        
        dataArray = dataArray.map((data) => {
            return data = '<li>'+data+'</li>'
        })
        autoBox.classList.add('active')
        showAdress (dataArray)
        let liItem = autoBox.querySelectorAll("li")
        for(let i=0;i<liItem.length;i++){
            liItem[i].addEventListener("click",function(){
                inputSearch.value = liItem[i].innerHTML
                autoBox.classList.remove('active')
            })
        }
        //console.log(dataArray)
    }else{
        autoBox.classList.remove('active')
    }
}
function showAdress (list){
    let listData
    if (!list.length) {
        listData = '<li>'+inputSearch.value+'</li>'
    }else {
        listData = list.join('')
    }
    autoBox.innerHTML = listData
}

let recomentlist = [
    "Hà Nội",
    "Phủ lý",
    "Nam Định",
    "Ninh Bình",
    "Bỉm Sơn",
    "Thanh Hóa",
    "Minh Khôi",
    "Chợ Sy",
    "Vinh",
    "Yên Trung",
    "Hương Phố",
    "Đồng Lê",
    "Đồng Hới",
    "Đông Hà",
    "Huế",
    "Đà Nẵng",
    "Tam Kỳ",
    "Núi Thành",
    "Quãng Ngãi",
    "Đức Phổ",
    "Bồng Sơn",
    "Diêu Trì",
    "Tuy Hòa",
    "Giã",
    "Ninh Hòa",
    "Nha Trang",
    "Tháp Chàm",
    "Sôn Mao",
    "Bình Thuận",
    "Biên Hòa",
    "Dĩ An",
    "Sài Gòn",
]

//Nơi đến 

outputSearch.onkeyup = (e) => {
    //console.log(e.target.value)
    let checkData = e.target.value
    let dataArray = []
    if(checkData){
        dataArray = recomentlist.filter((data) => {
            return data.toLocaleLowerCase().startsWith(checkData.toLocaleLowerCase())
        })
        
        dataArray = dataArray.map((data) => {
            return data = '<li>'+data+'</li>'
        })
        autoBox2.classList.add('active')
        showAdress2 (dataArray)
        let liItem = autoBox2.querySelectorAll("li")
        for(let i=0;i<liItem.length;i++){
            liItem[i].addEventListener("click",function(){
                outputSearch.value = liItem[i].innerHTML
                autoBox2.classList.remove('active')
            })
        }
        //console.log(dataArray)
    }else{
        autoBox2.classList.remove('active')
    }
}
function showAdress2 (list){
    let listData2
    if (!list.length) {
        listData2 = '<li>'+outputSearch.value+'</li>'
    }else {
        listData2 = list.join('')
    }
    autoBox2.innerHTML = listData2
}

//Tìm ga tàu

gatauSearch.onkeyup = (e) => {
    //console.log(e.target.value)
    let checkData = e.target.value
    let dataArray = []
    if(checkData){
        dataArray = recomentlist.filter((data) => {
            return data.toLocaleLowerCase().startsWith(checkData.toLocaleLowerCase())
        })
        
        dataArray = dataArray.map((data) => {
            return data = '<li>'+data+'</li>'
        })
        autoBox3.classList.add('active')
        showAdress3 (dataArray)
        let liItem = autoBox3.querySelectorAll("li")
        for(let i=0;i<liItem.length;i++){
            liItem[i].addEventListener("click",function(){
                gatauSearch.value = liItem[i].innerHTML
                autoBox3.classList.remove('active')
            })
        }
        //console.log(dataArray)
    }else{
        let allDataArray = recomentlist.map((data) => {
            return data = '<li>'+data+'</li>'
        })
        autoBox3.classList.add('active')
        showAdress3 (allDataArray)
        let liItem = autoBox3.querySelectorAll("li")
        for(let i=0;i<liItem.length;i++){
            liItem[i].addEventListener("click",function(){
                gatauSearch.value = liItem[i].innerHTML
                autoBox3.classList.remove('active')
            })
        }
    }
}
//
gatauSearch.addEventListener("click", function(){
    autoBox3.classList.remove('active');
    let allDataArray = recomentlist.map((data) => {
        return data = '<li>'+data+'</li>'
    })
    autoBox3.classList.add('active')
    showAdress3 (allDataArray)
    let liItem = autoBox3.querySelectorAll("li")
    for(let i=0;i<liItem.length;i++){
        liItem[i].addEventListener("click",function(){
            gatauSearch.value = liItem[i].innerHTML
            autoBox3.classList.remove('active')
        })
    }
})

//
function showAdress3 (list){
    let listData3
    if (!list.length) {
        listData3 = '<li>'+gatauSearch.value+'</li>'
    }else {
        listData3 = list.join('')
    }
    autoBox3.innerHTML = listData3
    //show các ga tàu khi click vào
    gatauSearch.addEventListener("click", function() {
        document.querySelector(".table").classList.add("active");
    });
}
//Khi ckick ra khỏi ô tìm ga tàu thì bảng dữ liệu sẽ ẩn đi

document.addEventListener('click', function(event) {
    const isClickInsideInput = gatauSearch.contains(event.target);
    const isClickInsideBox = autoBox3.contains(event.target);
    if (!isClickInsideInput && !isClickInsideBox) {
        autoBox3.classList.remove('active');
    }
  });

  function showBox3() {
    const isActive = autoBox3.classList.contains('active');
    if (!isActive) {
        autoBox3.classList.add('active');
    }
  }
  
  gatauSearch.addEventListener('focus', showBox3);
//
