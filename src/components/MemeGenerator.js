import React, {Component} from "react"

class MemeGenerator extends Component {
    constructor () {
        super()
        this.state = {
            topText:"",
            bottomText:"",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            memeImages:{}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)        
    }
    componentDidMount() {
        console.log('componentDidMount()')
        this.setState({loading:true})

        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                console.log(memes[0].name)
                this.setState({memeImages:memes})
            })
        
    }
    handleChange (event) {
        const {name,value} = event.target
        console.log('name=' + name )
        this.setState({[name]:value})
    }
    handleSubmit (event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.memeImages.length)
        const randomMeme = this.state.memeImages[randNum].url
        this.setState({randomImg:randomMeme})
    }

    render() {
        return (
            <div>
                <br></br>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}/>
                    <input
                        type="text"
                        name="bottomText"
                        placeholder="bottomText"
                        value={this.state.bottomText}
                        onChange={this.handleChange}/>
                    <button>Generate</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="problem?"/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
            
        )
    }

}

export default MemeGenerator