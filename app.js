var express=require('express')
var path=require('path')
var session=require('express-session')
var expressvalidator=require('express-validator')
const jwt=require('jsonwebtoken')
var bodyparser=require('body-parser')
var app=express()
function verifytoken(req,res,next){
	
	//get the auth header value
const bearerheader=req.headers['authorization']
if(typeof bearerheader!=='undefined')
{
	const bearer=bearerheader.split(' ')
	const bearertoken=bearer[1]
	req.token=bearertoken
	next()
	
}else{
	
	res.sendStatus(403)
}
	
	
}
app.post('/login',(req,res)=>{
		const user={
		id:1,
		username:'ronser',
		
}
jwt.sign({user:user},'secretkey',(err,token)=>{
	res.json({
		token:token
		
	})
})
	
})
app.post('/login/posts',verifytoken,(req,res)=>{
jwt.verify(req.token,'secretkey',(err,data)=>{
	if(err)
	{
		res.sendStatus(403)
	}
	else{
		res.json({
		message:'posts created..',
		data:data
		
	})
		
	}
	
})

	
	
})

app.listen(3000,function(){
console.log('connected')	
	
})