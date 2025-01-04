export default function Skeleton() {
	return (
		<div className='animate-pulse'>
			<div className='w-40 h-6 mb-4 bg-gray-700 rounded-md shimmer'></div>
			<div className='w-full mb-4 bg-gray-700 rounded-md h-96 shimmer'></div>
			<div className='w-3/4 h-6 mb-2 bg-gray-700 rounded-md shimmer'></div>
			<div className='w-1/2 h-6 mb-4 bg-gray-700 rounded-md shimmer'></div>
			<div className='w-full h-24 bg-gray-700 rounded-md shimmer'></div>
		</div>
	);
};