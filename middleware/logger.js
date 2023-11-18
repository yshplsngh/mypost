const fs = require('fs')
const fsPromises = require('fs/promises')
const {v4:uuid} = require('uuid')
const {format} = require('date-fns')
const path = require('path')


const logEvents = async (message,logFileName)=>{
    const dateTime = format(new Date() , 'ddMMyyyy\tHH:mm:SS')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logFileName),logItem)
    } catch (error) {
        console.log(error)
    }
}

const logger = (req,res,next) =>{
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`,'reqLog.log')
    console.log(`${req.method}\t${req.path}`)
    next()
}

module.exports = {logger,logEvents}