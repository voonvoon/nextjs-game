export interface Game {
	_id: string;
	name: string;
	price: number;
	images: Array<{
		_key: string;
		url: string;
	}>;
	isFeatured: boolean;
	isTrending: boolean;
	category: { name: string; slug: { current: string } };
	slug: { current: string };
	quantity: number;
	description: string;
}


export type GameSubset = Pick<
	Game,
	'_id' | 'price' | 'quantity' | 'images' | 'name'
> & { maxQuantity: number }; //add 1 more type for stripe purpose

export interface GameSubset3 {
	_key: string;
	game: {
	//   _key: number;
	  _id: string;
	//   _type: string;
	};
	quantity: number;
	maxQuantity: number
  }

export interface GameSubset2 {
	name: string;
	price: number;
	category:string;
	discount:number;
	quantity: string;
	tax_percent: string;
}