import React from 'react'
import './OrangeSpace.css'
import { Link } from 'react-router-dom'

export const OrangeSpace = () => {
	return (
		<>
			<section>
				<div className="hero-main">
					<div className="hero-home-gradient">
						<div className="container hero-home-bg">
							<div className="hero-home-bg-overlay hidden-sm hidden-md hidden-lg"></div>
							<div className="row hero-home-content">
								<div className="text-white text-center">
									<div className="col-xs-12 col-md-10 col-md-offset-1">
										<h1 className="display-2">Go with us. El music.</h1>
									</div>
									<div className="col-xs-12 col-md-10 col-md-offset-1">
										<Link to="/login" className="btn btn-green btn-lg">
											Login and discover
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
