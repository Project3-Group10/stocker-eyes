import React from "react";
//Example template from https://github.com/000kelvin/react-landing-page

function Content() {
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="container content">
                <div className="row">
                    <div className="col-sm-3 talk">
                        <h1>Stock</h1>
                        <h1>Tracking</h1>
                        <br />
                        <h6 className="bold-four">
                             You’ll be able to keep track of your stocks anytime, anywhere. With stock price notifications, favorite lists, and the latest headlines, you’ll be able to keep up with the fast moving world of stock trading.
                    </h6>
                        <br />
                        <h6><a className="btn btn-dark start start-two" href="/home">Get Started</a></h6>
                    </div>
                    <div className="col-sm-9 showcase-img">
                        {/* <div className="circle"></div> */}
                    </div>
                </div>
            </div>

            <section class="features-icons bg-light text-center det-ails">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <i class="icon-screen-desktop m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Price Notifications</h5>
                                <p class="lead mb-0">Stay up-to-date with your portfolio</p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <i class="icon-layers m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>News Feeds</h5>
                                <p class="lead mb-0">Never miss a beat, use news feeds to see the latest news about your stock</p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <i class="icon-check m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Stock Overview</h5>
                                <p class="lead mb-0">See how your entire portfolio is performing at  glance </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Content;