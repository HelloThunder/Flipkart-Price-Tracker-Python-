// B_NuCI
// _30jeq3 _16Jk6d

const cheerio = require('cheerio');
const fetch = require('node-fetch');

const F_url='https://www.flipkart.com/boat-rockerz-450-bluetooth-headset/p/itmdb79a9c0cb56f?pid=ACCFEHZ8GSGWMMSD&lid=LSTACCFEHZ8GSGWMMSDXIRNEY&marketplace=FLIPKART&srno=s_1_7&otracker=AS_QueryStore_OrganicAutoSuggest_2_5_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_2_5_na_na_na&fm=SEARCH&iid=27aec5f6-f087-426c-8e1c-470d7297eada.ACCFEHZ8GSGWMMSD.SEARCH&ppt=sp&ppn=sp&ssid=i95y5tojta8cn4001608019696487&qH=dc6844f6027b0a32';
const EXPECTED_AMOUNT=1500;

// convet price into integer
const convertPrice = (amount)=>parseInt(Number(amount.replace(/[^0-9.-]+/g,"")));

var getHtml = async url =>{
    const headers ={
        method:'get',
        headers:{
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0'
        }
    }

    const res =await fetch(url);

    const html =await res.text();

    return cheerio.load(html);
}


const checkFlipkartPrice = async (url,expected_price)=>{
    const $_parsed_html = await getHtml(url);

    const price =$_parsed_html('div').find('._16Jk6d').text() //fetch price
    const name = $_parsed_html('.yhB1nd').find('.B_NuCI').text();

    var priceInt =convertPrice(price) //convert price to int 

    if(priceInt<=expected_price){
        sendPush(priceInt,name)    //send push notification to devices
        console.log("Yeyy....,Price went dwn push send to device ,check your mobile/pc");
    }
    else{
        console.log('No hope this hour , actively scanning for changes');
    }
}

const sendPush =async(price,name)=>{
    const notifyChannelId = 'JY7iDxc5M7erIqX1';
    const dataString = `Pric went down :${name} went below ${price}`;
    var headers = {
        method:'POST',
        body: dataString,
        headers:{
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0'
        }
    }
    const res = await fetch(`https://notify.run/${notifyChannelId}`,headers)
    return true ;
}

checkFlipkartPrice(F_url,EXPECTED_AMOUNT);

// var delay =1*1000 ;
// setTimeout(checkFlipkartPrice,delay);