var express=require("express");
var app =express();
var fs=require('fs')
var bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
  });
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index.html');
})
app.post('/solve',(req,res)=>{
    let c=0;
    let h=parseFloat(req.body.height),ini=0.0,prevTime=0.0,t,e=parseFloat(req.body.coeff),change=0.5;
    let g=10.0;
    let ans={
        coor:[],
        bounces:0
    }
    if(req.body.coeff==="1"){
        console.log("coeff should ne less than 1");
        res.send();
    }
    while(1){
        if(h===0){
            if(ini===0){
                break;
            }
            h=parseFloat((ini*ini)/(2*g))
            t=parseFloat(ini/g);
            let vel=ini;
            while(vel>0){
                let time=parseFloat((ini-vel)/g);
                let height=parseFloat(0.5*g*time*time);
                ans.coor.push([prevTime+time,height]);
                vel=vel-change;
            }
            prevTime+=t;
            ini=0.0;

        }
        else{
            if(h<0.05){
                break;
            }
            t=parseFloat(2*h)/g;
            t=parseFloat(Math.sqrt(t));
            ini=parseFloat(g*t);
            let vel=0;
            while(vel<=ini){
                let time=parseFloat(vel/g);
                let height=parseFloat(0.5*g*time*time);
                ans.coor.push([prevTime+time,h-height]);
                vel=vel+change;
            }
            h=0.0
            ini=ini*e;
            prevTime+=t;
            ans.bounces++;
        }
        
    }
    var jsonContent = JSON.stringify(ans);
    fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        } console.log("JSON file has been saved.");
    });
   res.json(ans);
})
app.listen(3000);