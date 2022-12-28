var devicewidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var msg_img = document.getElementById('msg_img');

msg_img.onerror = function() {
    if(!msg_img.classList.contains('not_showing')) {
        msg_img.classList.add('not_showing');
    }
};
function calculator() {
    // Check Values
    // Get textbox values
    var correct = parseInt(document.getElementById("corrects").value);
    var incorrect = parseInt(document.getElementById("incorrects").value);
    var numofques = parseInt(document.getElementById("numofquestions").value);

    const inputs = [correct, incorrect, numofques]
    for (var num in inputs) {
        if(isNaN(inputs[num])) {
            popup("لطفا فرم‌ها را پر کنید و تنها از کیبورد انگلیسی استفاده کنید. ", "", "larger");
            return;
        }
    }
    if (correct + incorrect > numofques) {
        popup("فرم را دوباره بررسی کنید. چنین چیزی امکان ندارد", "img/pokerface", "larger")
        return;
    }
    var correct_setting = parseInt(document.getElementById('negsettings_corrects').value);
    var incorrect_setting = parseInt(document.getElementById('negsettings_incorrects').value);
    if (correct_setting == "") {
        correct_setting = "1"
    }
    if (incorrect_setting == "") {
        incorrect_setting = "3"
    }
    if(document.getElementById("is_negative").checked) {
        incorrect = (correct_setting / incorrect_setting) * incorrect;
        var result = ((correct - incorrect) / numofques) * 100;
    } else {
        var result = (correct / numofques) * 100;
    }
    

    showToUser(result)
}
function showToUser(input) {
    // var final = "نتیجه: "
    var final = "";
    input = input.toFixed(2);
    final += input.toString() + "%";
    final += " ";
    if(input <= 0) {
        popup(final, "img/under-0");
        return;
    }
    if(input <= 10){
        popup(final, "img/under-10");
        return;
    }
    if(input <= 30){
        popup(final, "img/under-30");
        return;
    }
    if(input <= 50) {
        popup(final, "img/under-50");
        return;
    }
    if(input <= 70) {
        popup(final, "img/over-50");
        return;
    }
    if(input <= 90) {
        popup(final, "img/over-70");
        return;
    }
    if(input <= 100 ) {
        popup(final, "img/over-90");
        return;
    }
}
function popup(msg, imgloc, size) {
	if(size === undefined) {
		size = "";
	}
    var popup = document.getElementById("popup");
    p = document.getElementById("msg_result");
    img = document.getElementById("msg_img");
    p.innerHTML = msg;
    if(imgloc != "") {
        if(window.devicewidth > 600) {
            imgloc += "-256.png";
            img.width = 256;
            img.height = 256;
        } else {
            imgloc += "-200.png";
            img.width = 200;
            img.height = 200;
        }
        img.src = imgloc;
        if(img.classList.contains("not_showing")) {
            img.classList.remove("not_showing");
        }
    } else {
        img.src = ""
        if(!img.classList.contains("not_showing")) {
            img.classList.add("not_showing");
        }
    }
    // if(window.devicewidth > 600) {
    //     imgloc += "-256.png";
    //     img.width = 256;
    //     img.height = 256;
    // } else {
    //     imgloc += "-200.png";
    //     img.width = 200;
    //     img.height = 200;
    // }
    // img.src = imgloc;
    if(size != "") {
        p.style.fontSize = size;
    } else {
        p.style.fontSize = "xx-large";
    }
    if(popup.classList.contains("not_showing")) {
        popup.classList.remove("not_showing");
    }
}


function closepopup() {
    let popup = document.getElementById("popup");
    if(!popup.classList.contains("not_showing")) {
        popup.classList.add("not_showing");
    }
}

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('service worker registered'))
        .catch(err => console.log('service worker not registered', err));
} else {
    console.log("service worker not supported by your browser")
}

// If the site shows in all screen(add to home screen) mode
if (
    (!("standalone" in window.navigator) && window.navigator.standalone) // For IOS
    ||
    (window.matchMedia('(display-mode: standalone)').matches) // For Android
) {
    document.getElementById("offline_info").style.display = "none";
}
