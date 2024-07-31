const videoModel = require('../model/video.model')

const addvideo = async(req, res) => {
    const data = req.body

    const title = data.title
    const vidURL = data.vidURL
    const transcript = data.transcript
    const timeStamps = data.timeStamps

    if ( !title || ! vidURL ){
        res.status(400).json({
            message: 'please enter title and url for the video'
        })
        return
    }

    const existingVid = videoModel.findOne({
        title
    })

    if(!existingVid){
        const newVid = new videoModel({
            title,
            vidURL,
            transcript,
            timeStamps
        })
        try{
            await newVid.save()
            res.status(200).json({
                message: 'video saved successfully'
            })
            return
        }catch(err){
            res.status(500).json({
                message: 'internal server error',
                error: err 
            })
            return
        }
    }else{
        res.status(401).json({
            message: 'please enter a unique title'
        })
    }
}

const viewAll = async(req, res) => {
    try{
        let videos = await videoModel.find({})
        if (videos.length == 0){
            res.status(400).json({
                message: 'no videos found'
            })
            return
        }
        res.status(200).json({
            videos
        })
    }catch(err){
        res.status(500).json({
            message: "internal server error",
            error: err.stack
        })
    }
}

module.exports = {viewAll}