import React from 'react';
import './Entry.css';

import Loading from '../Loading/Loading';

export default class Entry extends React.Component {
	state = {
		loading: true,
		error: null
	}

	type = this.props.type;
	speciesLink = this.props.thisOne.species;
	speciesName = null;
	homeworldLink = this.props.thisOne.homeworld;
	homeworldName = null;

	async componentDidMount() {
		if (this.speciesLink) {
			await fetch(this.speciesLink)
				.then(res => res.json())
				.then(data => {
					this.speciesName = data.name;
				});
		}

		if (this.homeworldLink) {
			await fetch(this.homeworldLink)
				.then(res => res.json())
				.then(data => {
					this.homeworldName = data.name;
				});
		}

		this.setState({
			loading: false
		})
	}

	renderStats(me) {
		switch (this.type) {
			case 'people':
				return (
					<>
						<li>
							<span
								className='crossRef'
								tabIndex='0'
								onClick={e => {
									this.props.crossref(
										e,
										this.speciesLink,
										'species'
									)
								}}>
								{this.speciesName}
							</span> born {me.birth_year}
						</li>
						<li>
							gender: {me.gender}<br />
							homeworld: {this.homeworldName === 'unknown'
								? <span>unknown</span>
								: <span
									className='crossRef'
									tabIndex='0'
									onClick={e => {
										this.props.crossref(
											e,
											this.homeworldLink,
											'planets'
										)
									}}>
									{this.homeworldName}
								</span>
							}
						</li>
						<li>
							height: {(me.height * .01).toFixed(2)}{me.height !== 'unknown' && <span>m</span>}<br />
							weight: {me.mass}{me.mass !== 'unknown' && <span>kg</span>}
						</li>
						<li>
							skin: {me.skin_color}<br />
							hair: {me.hair_color}<br />
							eyes: {me.eye_color}
						</li>
					</>
				)
			case 'planets':
				return (
					<>
						<li>
							population: {me.population}
						</li>
						<li>
							length of day: {me.rotation_period} standard hours<br />
							length of year: {me.orbital_period} standard days<br />
							diameter: {me.diameter}km<br />
							gravity: {me.gravity}
						</li>
						<li>
							climate: {me.climate}<br />
							terrain: {me.terrain}<br />
							surface water: {me.surface_water}%
						</li>
					</>
				)
			case 'species':
				return (
					<>
						<li>
							{me.designation} {me.classification}
						</li>
						<li>
							average lifespan: {me.average_lifespan} years<br />
							average height: {(me.average_height * .01).toFixed(2)}m
						</li>
						<li>
							skin: {me.skin_colors}<br />
							hair: {me.hair_colors}<br />
							eyes: {me.eye_colors}
						</li>
						<li>
							language: {me.language}<br />
							homeworld: {this.homeworldName === 'unknown'
								? <span>unknown</span>
								: <span
									className='crossRef'
									tabIndex='0'
									onClick={e => {
										this.props.crossref(
											e,
											this.homeworldLink,
											'planets'
										)
									}}>
									{this.homeworldName}
								</span>
							}
						</li>
					</>
				)
			default:
				console.error('Something went wrong! Search again');
		}
	}

	render() {
		const me = this.props.thisOne;
		console.log(this.props);

		return (
			<li className='listing'>
				<h2>{me.title || me.name}</h2>

				{this.state.loading
					? <Loading loadItem='DATA' />
					: <ul className='stats'>
						{this.renderStats(me)}
					</ul>
				}
			</li>
		);
	}
}