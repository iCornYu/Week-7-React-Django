import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class ShopPost extends Component {

    render() {
        const p = this.props.product
        return (

            <Link to={`/shop/${p.product_id}`} className="card col-3 text-decoration-none text-dark">
                <img src={p.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="card-text">{p.product_type}</p>
                    <p className="card-text">${p.price}</p>

                </div>
            </Link>

        )
    }
}
