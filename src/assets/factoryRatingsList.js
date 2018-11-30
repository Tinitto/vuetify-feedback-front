const seed = [
    {
        user: 'John Doe',
        rating: 4,
        reason: 'A random reason',
        created: new Date(),
    },
    {
        user: 'Jane Doe',
        rating: 3.5,
        reason: 'Almost there',
        created: new Date(),
    },
    {
        user: 'Paul Doe',
        rating: 2,
        reason: 'Shame',
        created: new Date(),
    },
    {
        user: 'Drogba Doe',
        rating: 5,
        reason: 'Nice!!!!',
        created: new Date(),
    },
    {
        user: 'Sheenah Doe',
        rating: 3.5,
        reason: 'Fix a few issues and I will give you a perfect score',
        created: new Date(),
    },
    {
        user: 'Julie Doe',
        rating: 2.5,
        reason: 'Thus app is wack. How can you do this to us?',
        created: new Date(),
    },
    {
        user: 'Mary Doe',
        rating: 3,
        reason: 'Average',
        created: new Date(),
    },

    {
        user: 'Peter Doe',
        rating: 3,
        reason: 'Not bad',
        created: new Date(),
    },
    {
        user: 'Pogba Doe',
        rating: 4,
        reason: 'A random reason',
        created: new Date(),
    },
]

export default (function makeRatingsObject(){
    let ratings = [];
    let applicationIds = [1, 2, 3, 4];
    let seedListLength = seed.length;
    applicationIds.map((id, idPosition) => {
        ratings = ratings.concat(seed.map((rating, index) => ({
            _id: ((seedListLength * idPosition) + index + 1),
            applicationId: id,
            ...rating
        })));
    });
    ratings.unshift({});
    let ratingsObject = {...ratings};
    delete ratingsObject[0];
    return ratingsObject;
})();