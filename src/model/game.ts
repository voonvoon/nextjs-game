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

export interface GameSubset2 {
	name: string;
	price: number;
	quantity: number;
}