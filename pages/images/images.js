import React, { Component } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Image from 'next/image';
import { createClient } from 'pexels';

class Images extends Component {

    constructor(props) {
        super();
        this.state = {
            images: [],
            isData: false
        };
    }

    async componentDidMount() {
        const API_KEY = '563492ad6f91700001000001656e92ec38eb404e9d6a22fa68b2730c';
        const client = createClient(API_KEY);
        const query = 'sun';

        client.photos.search({ query, per_page: 20 }).then(data => {
            this.setState({ images: data.photos })
        });
    }

    myLoader = ({ src }) => {
        return src;
    }

    render() {

        const items = [];

        this.state.images.map((img) => {
            items.push(
                <div className="col-6 img-col">
                    <Image
                        priority
                        src={img.src.landscape}
                        className="img-fluid"
                        alt="image"
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="cover"
                        loader={this.myLoader}
                    />
                </div>
            )
        })


        return (
            <Layout>
                <Head>
                    <title>Sunrise and Sunset</title>
                </Head>

                <div className="container">
                    <div className="row">
                        {items}
                    </div>
                </div>

            </Layout >
        )
    }
}

export default Images;