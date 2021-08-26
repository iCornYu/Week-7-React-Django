import React, { Component } from 'react'

export default class Cart extends Component {

    getUniqueCart = (cart) => {
        let uniqueCart = [];
        let ids = new Set();
        for (let item of cart) {
            if (!ids.has(item.product_id)) {
                uniqueCart.push(item);
                ids.add(item.product_id)
            }
        }
        return uniqueCart
    }

    getQuantity = (cartItem, cartList) => {
        let count = 0;
        for (let item of cartList) {
            if (cartItem.product_id === item.product_id) {
                count++;
            }
        }
        return count
    }

    render() {
        return (
            <>{this.props.cart.length > 0 ? (
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getUniqueCart(this.props.cart).map(p => (
                                <tr key={p.product_id}>
                                    <td>{p.product_id}</td>
                                    <td>{p.product_type}</td>
                                    <td>{this.getQuantity(p, this.props.cart)}</td>
                                    <td>{p.price}</td>
                                    <td>${(this.getQuantity(p, this.props.cart) * p.price).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => this.props.removeFromCart(p)} className="btn btn-danger">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                ) : (
                <div className="container">
                    <h1>Your cart is empty </h1>
                </div>
                
                )}
            </>
        )
    }
}
