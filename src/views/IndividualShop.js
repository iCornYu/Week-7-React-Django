import React, { Component } from 'react'

export default class IndividualShop extends Component {
    constructor(){
        super();
        this.state = {
            product:{},
            image: {},
        }
    }

    componentDidMount = async () => {
        const res = await fetch(`http://127.0.0.1:8000/api/products/${this.props.match.params.product_id}`)
        const data = await res.json();
        const imageres = await fetch(`http://127.0.0.1:8000/media/${this.props.match.params.product_id}.jpg`)
        const imageBlob = await imageres.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob)
        // console.log(imageObjectURL)
        this.setState({
            product: data,
            image: imageObjectURL,
        })
    }

    importImage =  () => {
        const imageUrl = `http://127.0.0.1:8000/media/${this.props.match.params.product_id}.jpg`
        fetch(imageUrl)
            .then(res=> res.blob())
            .then(imageBlob => {
                const imageObjectURL = URL.createObjectURL(imageBlob)
                console.log(imageObjectURL)
                return imageObjectURL
                
            })
    }

    render() {
        const p = this.state.product
        const i = this.importImage()
        console.log(i)
        return (
            
            <div className="card col-8">
                <img src="" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="card-text">{p.product_type}</p>
                    <p className="card-text">${p.price}</p>
                </div>
            </div>
        )
    }
}