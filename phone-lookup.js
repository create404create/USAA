const main_container = document.getElementById("main");
const alert_container = document.getElementById("alert-container");
const loader = document.getElementById("loader");
const num_wrap = document.getElementById("num_wrap");
const input = document.getElementById("input");
const invalid = document.getElementById("invalid");
const message = invalid.classList;
const report_form = document.getElementById("report-form");
const report_phone_input = document.getElementById("report-phone-input"); 
const reason_input = document.getElementById("reason-input"); 
const report_submit_label = document.getElementById("report-submit-label");
const report_btn = document.getElementById("report-btn");
const loader_icon = document.getElementById("loader-icon");
const dfrag = document.createDocumentFragment();
const tcpa = document.getElementById("tcpa");
const tcpa_value = document.getElementsByClassName("tcpa-value");
const cards_wrap = document.getElementById("cards-wrap");
const sample = document.getElementsByClassName("sample");
const sample1 = document.getElementById("sample1");
const sample2 = document.getElementById("sample2");
const cx_loader = document.getElementById("cx-loader");
const cx_nf = document.getElementById("cx-not-found");
const cx_ie = document.getElementById("cx-ie");

// setTimeout(()=>{togglePopup(loader, true)}, 5000); // uncomment for announcement

const states = new Map(
    [
        ["AL", "Alabama"],
        ["AK", "Alaska"],
        ["AZ", "Arizona"],
        ["AR", "Arkansas"],
        ["CA", "California"],
        ["CO", "Colorado"],
        ["CT", "Connecticut"],
        ["DE", "Delaware"],
        ["FL", "Florida"],
        ["GA", "Georgia"],
        ["HI", "Hawaii"],
        ["ID", "Idaho"],
        ["IL", "Illinois"],
        ["IN", "Indiana"],
        ["IA", "Iowa"],
        ["KS", "Kansas"],
        ["KY", "Kentucky"],
        ["LA", "Louisiana"],
        ["ME", "Maine"],
        ["MD", "Maryland"],
        ["MA", "Massachusetts"],
        ["MI", "Michigan"],
        ["MN", "Minnesota"],
        ["MS", "Mississippi"],
        ["MO", "Missouri"],
        ["MT", "Montana"],
        ["NE", "Nebraska"],
        ["NV", "Nevada"],
        ["NH", "New Hampshire"], 
        ["NJ", "New Jersey"],
        ["NM", "New Mexico"],
        ["NY", "New York"],
        ["NC", "North Carolina"],
        ["ND", "North Dakota"],
        ["OH", "Ohio"],
        ["OK", "Oklahoma"],
        ["OR", "Oregon"],
        ["PA", "Pennsylvania"],
        ["RI", "Rhode Island"],
        ["SC", "South Carolina"],
        ["SD", "South Dakota"],
        ["TN", "Tennessee"],
        ["TX", "Texas"],
        ["UT", "Utah"],
        ["VT", "Vermont"],
        ["VA", "Virginia"],
        ["WA", "Washington"],
        ["WV", "West Virginia"],
        ["WI", "Wisconsin"],
        ["WY", "Wyoming"],
        ["DC", "Colombia"],
		["PR", "Puerto Rico"]
    ]
)

// initialization
submit.disabled = true;
submit.setAttribute("title", "wait");
submit.classList.add("disabled-btn");
input.readOnly = true;

report_phone_input.readOnly = true;
report_submit_label.setAttribute("title", "wait");
report_submit_label.classList.add("disabled-btn");
report_btn.style.cursor = "not-allowed";
report_btn.disabled = true;
loader_icon.style.opacity = "0";
setTimeout(()=>{
    submit.disabled = false;
    submit.removeAttribute("title");
    submit.classList.remove("disabled-btn");
    input.readOnly = false;

    report_phone_input.readOnly = false;
    report_submit_label.removeAttribute("title");
    report_submit_label.classList.remove("disabled-btn");
    report_btn.style.cursor = "pointer";
    report_btn.disabled = false;
}, 1500)

function toggle_err(flag){
    // default state
    Array.from(tcpa_value).forEach((element, index) => {
        if (index!=6){
            element.innerText = "...";
        }
    });
    tcpa.classList.remove("warn","ie");
    tcpa_value[0].classList.remove("alert");
    Array.from(tcpa_value).forEach((elem, index)=>{
        if(index>1){
            elem.classList.remove("alert", "safe");
        }
    })
    
    // cx_loader.style.columnGap = "8px";
    // Array.from(cx_loader.children).forEach(element => {
    //     if(element.classList.contains("loader-on")){
    //         element.classList.replace("loader-on", "loader-off");
    //     }else{
    //         element.classList.add("loader-off");
    //     }
    // });

    // cards_wrap.replaceChildren(sample1)
    // cards_wrap.appendChild(sample2)

    if(flag){
        message.add("visible");
        num_wrap.classList.add("invalid");
        window.inv = true;
        return;
    }
    else{
        message.remove("visible");
        num_wrap.classList.remove("invalid");
        
        cards_wrap.replaceChildren(cx_loader);
        // Array.from(cx_loader.children).forEach(element => {
        //     // element.classList.replace("loader-off", "loader-on");
        //     element.classList.add("loader-on");
        // });
    }
    
}

// Array.from(cx_loader.children).forEach(element => {
//     element.classList.add("loader-off");
// });

function togglePopup(elem, flag=false){
    const cb = ()=>{
        elem.style.opacity = "0";
        setTimeout(()=>{
            elem.style.height = "0";
            elem.style.display = "none";
            main_container.style.display = "block";
        }, 1000)
    }
    if(flag === true){
        setTimeout(cb, 3000)
    }else{
        cb()
    }
};

(async function() {
    count = 0
    const interval = setInterval(async ()=>{
        try{
            const scrub_info = await fetch("https://api.ipify.org/")
            const res = await scrub_info.text()
            if(scrub_info.ok){
                sessionStorage.setItem("pi", res)
                clearInterval(interval)
            }
        }catch{
            if(count > 10){
                clearInterval(interval)
            }
            count+=1
        }
    }, 2000)
}())

async function getAdditional(u, x){
    for(let i=1; i<=2;i++){
        const n_ = (x+i).toString()
        const _n = (x-i).toString()
        getPersonInfo(`${u}${n_}`)
        getPersonInfo(`${u}${_n}`)
    }
}
function validate(x){
    x=x.trim()
    const val = "user";
    const _str = "id";
    const _var = "id1";
    tcpa_value[0].innerText="...";
    // if(x && x.length != 10){
    //     toggle_err(true);
    //     return;
    // }
    // else{
    toggle_err(false);
    submit.disabled = true;
    submit.setAttribute("title", "wait");
    submit.classList.add("disabled-btn");
    input.readOnly = true;
    _s="_st"
    setTimeout(() => {
        submit.disabled = false;
        submit.removeAttribute("title");
        submit.classList.remove("disabled-btn");
        input.readOnly = false;
    }, 4500);

    cards_wrap.replaceChildren(cx_loader);

    tcpa_value[0].innerText=x;
    report_phone_input.value=x;

    window.curr = x;
    window.inv = false;
    let pi = window.sessionStorage.getItem("pi");
    if(!pi){
        pi = "0.0.0.0";
    }
    
    try{
        preFind(`${window.sessionStorage.getItem(val)}${x}&pi=${pi}`, x);
    }catch{}
    
    try{
        getPerson(`${window.sessionStorage.getItem(_str)}${x}&pi=${pi}`, `${window.sessionStorage.getItem(_var)}${x}`, x, false);
    }catch{}
    
    // try{
    //     getStatus(`${window.sessionStorage.getItem(_s)}${x}&pi=${pi}`, x)
    // }catch{}
    // try{
    //     getPerson(`${window.sessionStorage.getItem(_var)}${x}`, x, true)
    // }catch{}
        // setTimeout(()=>{
    //     getAdditional(`${window.sessionStorage.getItem(_str)}`, Number(x));
    // },5000)
}


const addCards = (persons, bs = null, count=0, flag = false)=>{
    if(cards_wrap.contains(cx_loader)){
        cards_wrap.removeChild(cx_loader)
    }
    for (let person of persons){
        !flag ? cards_wrap.appendChild(cxCard(person, bs, flag)): cards_wrap.prepend(cxCard(person, bs, flag)) 
    }
    //  resume wait
    // submit.disabled = false
    // submit.removeAttribute("title");
    // submit.classList.remove("disabled-btn");
    // input.readOnly = false
}

async function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}

submit = document.getElementById("submit")
const initiator = (e)=>{
    e.preventDefault();
    e.stopPropagation();

    input.value = input.value.replace(/\D/g, '');
    
    const x = input.value.toString();
    if(x.length != 10 || Number(x)<0 || Number(x[0])<2){
        toggle_err(true);
        tcpa_value[0].innerText = "...";
        return;
    }
    validate(Number(x).toString());
}
submit.addEventListener("click", initiator)
input.addEventListener("keyup", (e)=>{
    e.preventDefault();
    e.stopPropagation();
    input.value = input.value.replace(/\D/g, '');
    if (e.key === "Enter"){
        input.blur()
    }
})

report_form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
})
report_btn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    report_phone_input.value = report_phone_input.value.replace(/\D/g, '');
    const reason = reason_input.value;
    const reasons = ["asked_for_dnc", "abuser", "screamer", "threatener", "troller", "smart_dnc", "litigator", "complainer"]
    if(!reasons.includes(reason)){
        reason_input.classList.add("invalid");
        await delay(2000);
        reason_input.classList.remove("invalid");
        return
    }

    const rt = sessionStorage.getItem("_rt");
    const pi = sessionStorage.getItem("pi")

    const x = report_phone_input.value.toString();
    window.curr_report_x = x;
    if(x.length != 10 || Number(x)<0 || Number(x[0])<2){
        report_phone_input.classList.add("invalid");
        return;
    }else{
        let reportStorage = JSON.parse(sessionStorage.getItem("reported"));
        if (!reportStorage){
            sessionStorage.setItem("reported", JSON.stringify([]))
            reportStorage = [];
        }else{
            if(reportStorage.includes(x)){
                var alertDiv = document.createElement('div');
                alertDiv.className = 'alert-box cancel';
                alertDiv.innerHTML = `
                    <i class="fa-solid fa-exclamation"></i>
                    <strong> Duplicate: </strong>${x}
                `
                alert_container.prepend(alertDiv);
                setTimeout(()=> {
                    alertDiv.style.opacity = "0";
                    setTimeout(()=>{
                        alertDiv.parentNode.removeChild(alertDiv);
                    }, 1500)
                }, 5000)
                report_form.reset();
                return
            }

        }
        report_phone_input.readOnly = true;
        report_submit_label.setAttribute("title", "wait");
        report_submit_label.classList.add("disabled-btn");
        report_btn.style.cursor = "not-allowed";
        report_btn.disabled = true;
        loader_icon.style.opacity = "1";
        loader_icon.src = "/icon/fading-circles-loader.svg";
        await delay(500);
        try{
            let counter = 0;
            while (true){
                counter+=1
                const response = await (await fetch(`${rt}${x}&reason=${reason}&pi=${pi}`)).json();
                if (response["status"] == "submitted" && window.curr_report_x == x){
                    sessionStorage.setItem("reported", JSON.stringify([...reportStorage, x]));
                    loader_icon.src = "/icon/check-mark-icon-white.svg";
                    var alertDiv = document.createElement('div');
                    alertDiv.className = 'alert-box success';
                    alertDiv.innerHTML = `
                        <i class="fa fa-check"></i>
                        <strong> Reported: </strong>${x}
                    `
                    alert_container.prepend(alertDiv);
                    setTimeout(()=> {
                        alertDiv.style.opacity = "0";
                        setTimeout(()=>{
                            alertDiv.parentNode.removeChild(alertDiv);
                        }, 1500)
                    }, 5000)
                    await delay(1000);
                    report_phone_input.readOnly = false;
                    loader_icon.style.opacity = "0";
                    report_submit_label.removeAttribute("title");
                    report_submit_label.classList.remove("disabled-btn");
                    report_btn.style.cursor = "pointer";
                    report_form.reset();
                    report_btn.disabled = false;
                    return
                }else if (response["status"] == "invalid" && window.curr_report_x == x){
                    report_phone_input.readOnly = false;
                    report_phone_input.classList.add("invalid"); // auto remove on focus
                    loader_icon.style.opacity = "0";
                    report_submit_label.removeAttribute("title");
                    report_submit_label.classList.remove("disabled-btn");
                    report_btn.style.cursor = "pointer";
                    report_btn.disabled = false;
                    return
                }
                if(counter > 5){
                    return // cant report after too many retries
                }
                await delay(3000);
            }
        }catch(e){
            console.log(e.message)
        }
    }
})
report_phone_input.addEventListener("focus", (e) => {
    report_phone_input.classList.remove("invalid");
    reason_input.classList.remove("invalid");
})
report_phone_input.addEventListener("keyup", (e) => {
    e.preventDefault();
    e.stopPropagation();
    report_phone_input.value = report_phone_input.value.replace(/\D/g, '');
    if (e.key === "Enter"){
        input.blur()
    }
})

async function fetchPersonInfo(ms, promise){
    const timeout = new Promise((resolve, reject) => {
        setTimeout(()=>{
            reject("Timeout Expired")
        }, ms)
    })
    return Promise.race([timeout, promise]);
}
async function getPersonInfo(u){

    return fetchPersonInfo(25000, fetch(u))
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        if (result.status == "err"){
            throw new Error("502");
        }
        return result;
    })
}

async function getStatus(u, x){
    try{
        var get_status = await (await fetch(u)).json();
    }catch{
        tcpa_value[2].innerText = tcpa_value[3].innerText = "Net Err!";
        return;
    }
    if(window.curr !== x){
        return;
    }
    if(get_status.status == "err"){
        tcpa_value[2].innerText = tcpa_value[3].innerText = "Server Err!";
    }
    else if (get_status.status == "invalid" || window.inv){
        window.inv = true;
        tcpa_value[2].innerText = tcpa_value[3].innerText = "...";
        return;
    }
    else{
        if (!tcpa_value[0].classList.contains("alert")){
            tcpa_value[2].innerText = get_status.ndnc
            tcpa_value[2].classList.add((get_status.ndnc == "Clean")?"safe":"alert")
            tcpa_value[3].innerText = get_status.sdnc
            tcpa_value[3].classList.add((get_status.sdnc == "Clean")?"safe":"alert")
            return
            // tcpa_value[2].innerText = get_status.dnc
            // tcpa_value[2].classList.add((get_status.dnc == "Clean")?"safe":"alert")
            // tcpa_value[3].innerText = get_status.dnc
            // tcpa_value[3].classList.add((get_status.dnc == "Clean")?"safe":"alert")
        }else{
            tcpa_value[2].innerText = tcpa_value[3].innerText = "...";
            return;
        }
    }

}


async function getPerson(u1, u2, x){
    await Promise.allSettled([getPersonInfo(u1)])
    .then(results=>{
        if (window.curr !== x ){
            return;
        }
        let fulfills = results.reduce(
            (acc, item)=>{
                return acc + (item.status == "fulfilled") ? 1 : 0;
            }, 0)
        if (fulfills == 0){
            throw new Error();
        }

        let error_flag = false;
        results.forEach(item => {
            if (item.value.status == "err"){
                error_flag = true
            }
        })

        let count = results.reduce((acc, item)=>{
                const v = item.value
                const c = (!v) ? 0 : v.count ? v.count : 0;
                return acc + c ;
        }, 0);

        if (error_flag && count==0){
            cards_wrap.replaceChildren(cx_ie);
            return
        } else if(!error_flag && count==0){
            cards_wrap.replaceChildren(cx_nf)
            return
        }

        results.forEach((item, i)=>{
            resp = item.value
            if(!resp || !resp["count"]){
                return;
            }

            if(resp["count"] != 0){
                addCards(resp["person"], resp["type"], resp["count"], i == 0 ? false : true) // for multiple premium results changes applied here, i == 0 ? false : true
            }
        })

    })
    .catch(errors=>{
        submit.disabled = false;
        submit.removeAttribute("title");
        submit.classList.remove("disabled-btn");
        input.readOnly = false;
        cards_wrap.replaceChildren(cx_ie);
    })
}


async function find(u, x){
    try{
        const response = await fetch(u);

        const code = response.status;
        if([500, 501, 502].includes(code)){
            return false;
        }    

        var scrub_info = await response.json();
    }catch{
        Array.from(tcpa_value).forEach((e, i)=>{
            if(i>0){
                e.innerText = "Net Error!";
            }
        })
        // tcpa_value[1].innerText = tcpa_value[4].innerText = tcpa_value[5].innerText = "Net Error!";
        tcpa.classList.add("ie");
        return true; 
    }
    if(window.curr !== x){
        return false;
    }

    const cb = (listed=null, type=null, ndnc=null, sdnc=null)=>{
        const setter_cb = (i = -1, v="...", c = "", t = false)=>{
            tcpa_value[i].innerText = v;
            if (c.length>1){
                tcpa_value[i].classList.add(c);
            }
            if(t){
                tcpa.classList.add(t);
            }
        }

        if (ndnc==null && sdnc==null){
            // tcpa.classList.remove("ie","warn");
            for (let i=2; i<4; i++){
                setter_cb(i, "Server Error!", "")
            }
        }
        (ndnc)?setter_cb(2, ndnc, "alert"):(ndnc==false)?setter_cb(2, "Clean", "safe"): setter_cb(2, "Server Error!", "");
        (sdnc)?setter_cb(3, sdnc, "alert"):(sdnc==false)?setter_cb(3, "Clean", "safe"): setter_cb(3, "Server Error!", "");
        (!type)?setter_cb(4, "Clean", "safe"):(type.toLowerCase().indexOf("tcpa") !== -1)?setter_cb(4, type, "alert", "warn"):setter_cb(4, type, "alert");
        (listed)?setter_cb(5, listed, "alert", "warn"):setter_cb(5, "Clean", "safe");
    
    
    }

    if(scrub_info.status == "err"){
        return false;
    }
    else if (scrub_info.status == "invalid"){
        message.add("visible");
        num_wrap.classList.add("invalid");
        window.inv = true;
        tcpa_value[0].innerText = "Bad Number!";
        tcpa_value[0].classList.add("alert");
        return true;
    }
    else{
        tcpa_value[0].innerText = scrub_info.phone;
        tcpa_value[1].innerText = scrub_info.state;
        cb(
            (scrub_info.listed === "Yes")?"Blacklisted":false,
            (scrub_info.type !== "No")?scrub_info.type:false,
            (scrub_info.ndnc == "Yes")?"Registered":(scrub_info.ndnc == "No")?false:null, 
            (scrub_info.sdnc == "Yes")?"Registered":(scrub_info.sdnc == "No")?false:null
        );
        return true;
    }
}

async function preFind(u, x){
    let iter = 0;
    while(!(await find(u, x)) && iter<=5){
        iter++;
    }
    if(iter>5){
        tcpa_value[2].innerText = tcpa_value[3].innerText = tcpa_value[4].innerText = tcpa_value[5].innerText = "Server Error!";
        tcpa.classList.add("ie");
        return;
    }
}

const div = document.createElement("div");
const h3 = document.createElement("h3");
const h4 = document.createElement("h4");
const h5 = document.createElement("h5");

function cxBasic({name:n = null, age:a = null, bs}, flag = false){
    const basic = div.cloneNode();
    basicClassList = ["d-row", "cx-basic"]
    basic.classList.add(...(!flag?basicClassList:[...basicClassList, "premium"]));
    
    const nameDiv = div.cloneNode();
    nameDiv.classList.add("d-col", "cx-name");
    const ageDiv = div.cloneNode();
    ageDiv.classList.add("d-col", "cx-age");

    nameLabel = h4.cloneNode();
    nameValue = h3.cloneNode()
    nameLabel.classList.add("label");
    nameValue.classList.add("value");
    nameLabel.innerText = flag && !bs ? "BUSINESS NAME" : "PERSON NAME";
    nameValue.innerText = (n.trim().length)>2 ? n.trim() : " -- " ;

    ageLabel = nameLabel.cloneNode(true);
    ageValue = nameValue.cloneNode(true);
    ageLabel.innerText = "AGE";
    a = a.toString()
    ageValue.innerText = (a.trim().length)>0? a : " -- ";

    nameDiv.appendChild(nameLabel);
    nameDiv.appendChild(nameValue);
    ageDiv.appendChild(ageLabel);
    ageDiv.appendChild(ageValue);

    basic.appendChild(nameDiv);
    basic.appendChild(ageDiv);

    return basic;
}

function cxAddress({home:h, city:c, state:s, zip:z, isDeliverable:isD = null, flag:f = null}, hl, flag){
    const addressDiv = div.cloneNode();
    addressDiv.classList.add("d-row", "cx-address");
    const homeDiv = div.cloneNode();
    homeDiv.classList.add("d-col", "cx-address-col", "home");
    const cityDiv = div.cloneNode();
    cityDiv.classList.add("d-col", "cx-address-col", "city");
    const stateDiv = div.cloneNode();
    stateDiv.classList.add("d-col", "cx-address-col", "state");
    const zipDiv = div.cloneNode();
    zipDiv.classList.add("d-col", "cx-address-col", "zip");
    const deliverableDiv = div.cloneNode();
    deliverableDiv.classList.add("d-col", "cx-address-col", "deliverable");

    if(flag){
        isD = (h.trim().length>5 && c.trim().length>2 && z.trim().length>2) ? "D" : "N"
    }

    if(f && !flag){
        deliverableDiv.classList.add("alert");
    }

    homeLabel = h5.cloneNode();
    homeValue = h4.cloneNode();
    homeLabel.classList.add("label");
    homeValue.classList.add("value");
    homeLabel.innerText = hl;
    h = h.toString()
    homeValue.innerText = (h.trim().length)>3? h.trim() : " -- ";

    cityLabel = homeLabel.cloneNode(true);
    cityValue = homeValue.cloneNode(true);
    cityLabel.innerText = "CITY";
    cityValue.innerText = (c.trim().length)>=3? c.trim() : " -- ";
    
    stateLabel = homeLabel.cloneNode(true);
    stateValue = homeValue.cloneNode(true);
    stateLabel.innerText = "STATE";
    stateValue.innerText = (window.screen.availWidth > 500) ? states.get(s.trim()) : s.trim();
    
    zipLabel = homeLabel.cloneNode(true);
    zipValue = homeValue.cloneNode(true);
    zipLabel.innerText = "ZIP";
    z = z.toString()
    zipValue.innerText = (z.trim().length)>=3? z.trim() : " -- ";

    deliverableDiv.innerText = isD;

    homeDiv.appendChild(homeLabel);
    homeDiv.appendChild(homeValue);
    cityDiv.appendChild(cityLabel);
    cityDiv.appendChild(cityValue);
    stateDiv.appendChild(stateLabel);
    stateDiv.appendChild(stateValue);
    zipDiv.appendChild(zipLabel);
    zipDiv.appendChild(zipValue);

    addressDiv.appendChild(homeDiv);
    addressDiv.appendChild(cityDiv);
    addressDiv.appendChild(stateDiv);
    addressDiv.appendChild(zipDiv);
    addressDiv.appendChild(deliverableDiv);

    return addressDiv;
}

function cxMisc(e, d){
    const misc = div.cloneNode();
    misc.classList.add("d-row", "cx-misc");
    
    const emails = div.cloneNode();
    emails.classList.add("d-col", "cx-misc-col", "cx-emails");
    const dob = div.cloneNode();
    dob.classList.add("d-col", "cx-misc-col", "cx-dob");

    emailsLabel = h4.cloneNode();
    emailsLabel.classList.add("label");
    emailsLabel.innerText = "EMAIL ADDRESS";

    // stat = h3.cloneNode(true);
    dobLabel = h4.cloneNode(true);
    dobValue = h3.cloneNode(true);
    // stat.classList.add("value", "status")
    dobLabel.classList.add("label")
    dobValue.classList.add("value")
    // stat.innerText = s;
    dobLabel.innerText = "D.O.B";
    d = d.trim()
    dobValue.innerText = d.length>=2 ? d : " -- ";

    emails.appendChild(emailsLabel);
    const createEmailValue = (x)=>{
        emailsValue = h3.cloneNode();
        emailsValue.classList.add("value", "email");
        emailsValue.innerText = x;
        return emailsValue
    }
    if(e.length != 0){
        for (const x of e){
            emails.appendChild(createEmailValue(x));
        }
    }else{
        emails.appendChild(createEmailValue("Not Present"));
    }
    // dob.appendChild(stat);
    dob.appendChild(dobLabel);
    dob.appendChild(dobValue);

    misc.appendChild(emails);
    misc.appendChild(dob);

    return misc;
}

function cxMisc2(relatives, dob){
    const misc = div.cloneNode();
    misc.classList.add("d-row", "cx-misc");
    
    const relatedDiv = div.cloneNode();
    relatedDiv.classList.add("d-col", "cx-misc-col", "cx-related");
    const dobDiv = div.cloneNode();
    dobDiv.classList.add("d-col", "cx-misc-col", "cx-dob");

    relatedLabel = h4.cloneNode(true);
    relatedLabel.classList.add("label");
    relatedLabel.innerText = "RELATED";

    relationsValueContainer = div.cloneNode(true);
    relationsValueContainer.classList.add("d-row", "value-container", "relations")

    // right side
    // stat = h3.cloneNode(true);
    dobLabel = h4.cloneNode(true);
    dobValue = h3.cloneNode(true);
    // stat.classList.add("value", "status")
    dobLabel.classList.add("label")
    dobValue.classList.add("value")
    // stat.innerText = s;
    dobLabel.innerText = "D.O.B";
    const d = dob.trim();
    dobValue.innerText = d.length>=2 ? d : " -- ";

    relatedDiv.appendChild(relatedLabel);

    const createRelationValue = (n)=>{
        n = n.trim()
        const relationValue = h3.cloneNode();
        const relationValueClassList = ["value", "relation"]
        relationValue.classList.add(...relationValueClassList);
        n = (n.length > 2) ? n : null
        if(n){
            relationValue.innerText = n;
            return relationValue
        }
        return null
    }
    if(relatives.length != 0){
        for (const rl of relatives){
            const relationValue = createRelationValue(rl);
            relationsValueContainer.appendChild(relationValue);
        }
    }else{
        relationsValueContainer.appendChild(createRelationValue("Not Present"));
    }
    
    // right append
    dobDiv.appendChild(dobLabel);
    dobDiv.appendChild(dobValue);

    relatedDiv.appendChild(relationsValueContainer);

    misc.appendChild(relatedDiv);
    // right append
    misc.appendChild(dobDiv);

    return misc;
}

function cxMisc1(relatives){
    const misc = div.cloneNode();
    misc.classList.add("d-row", "cx-misc");
    
    const relatedDiv = div.cloneNode();
    relatedDiv.classList.add("d-col", "cx-misc-col", "cx-related");
    // const dob = div.cloneNode();
    // dob.classList.add("d-col", "cx-misc-col", "cx-dob");

    relatedLabel = h4.cloneNode(true);
    relatedLabel.classList.add("label");
    relatedLabel.innerText = "RELATED";

    relationsValueContainer = div.cloneNode(true);
    relationsValueContainer.classList.add("d-row", "value-container", "relations")

    // right side
    // // stat = h3.cloneNode(true);
    // dobLabel = h4.cloneNode(true);
    // dobValue = h3.cloneNode(true);
    // // stat.classList.add("value", "status")
    // dobLabel.classList.add("label")
    // dobValue.classList.add("value")
    // // stat.innerText = s;
    // dobLabel.innerText = "D.O.B";
    // dobValue.innerText = d;

    relatedDiv.appendChild(relatedLabel);

    const createRelationValue = ({name:n, relation:r})=>{
        n = n.trim()
        r = r.trim()
        const relationValue = h3.cloneNode();
        const relationValueClassList = ["value", "relation"]
        relationValue.classList.add(...(r == "PotentialOwner" ? [...relationValueClassList, "po"] : relationValueClassList));
        if (r.length > 1){
            relationValue.setAttribute(...((r == "PotentialOwner") ? ["title", "Home Owner"] : ["title", r.split(/(?=[A-Z])/).join(" ")]));
        }

        n = (n.length > 2) ? n : null
        if(n){
            relationValue.innerText = n;
            return relationValue
        }
        return null
    }
    if(relatives.length != 0){
        for (const rl of relatives){
            const relationValue = createRelationValue(rl);
            relationsValueContainer.appendChild(relationValue);
        }
    }else{
        relationsValueContainer.appendChild(createRelationValue("Not Present"));
    }
    
    // right append
    // dob.appendChild(dobLabel);
    // dob.appendChild(dobValue);

    relatedDiv.appendChild(relationsValueContainer);

    misc.appendChild(relatedDiv);
    // right append
    // misc.appendChild(dob);

    return misc;
}



function cxCard({name, status = null, dob = null, age, addresses, emails = null, relatives = null}, bs = null, flag=false){
    const card = div.cloneNode();
    card.classList.add("d-col", "cx-card");
    // if(flag){
    //     card.setAttribute("title", "Potential Owner");
    // }
    if(!flag && status === "Deceased"){
        card.classList.add("deceased");
        card.setAttribute("title", "Deceased");
        // card.style.cursor = "no-drop";
    }


    const basic = cxBasic({name, age, bs}, flag);
    let addressElems = [];
    for (let i=0; i<addresses.length; i++){
        if (i>0){
            addressElems.push(cxAddress(addresses[i], !flag ? "LIVED AT" : addresses[i]["type"] == "PostalCode" ? "Postal Address" : addresses[i]["type"], flag));
        }
        else{
            addressElems.push(cxAddress(addresses[i], !flag ? "LIVES AT" : addresses[i]["type"] == "PostalCode" ? "Postal Address" : addresses[i]["type"], flag));
        }
    }

    card.appendChild(basic);
    const cxAddresses = div.cloneNode()
    cxAddresses.classList.add("d-col", "cx-addresses")
    for (let address of addressElems){
        cxAddresses.appendChild(address);
    }
    
    card.appendChild(cxAddresses)
    try{
        // const misc = !flag ? cxMisc(emails, dob) : null;
        // const misc = !flag ? cxMisc(emails, dob) : cxMisc1(relatives);
        const misc = !flag ? cxMisc2(relatives, dob) : cxMisc1(relatives);
        misc ? card.appendChild(misc) : null
    }catch{}
    
    return card;
}