import { User, CosmeticsUser } from '../cosmetics_user';

const store = new CosmeticsUser();

describe('Cosmetics Store Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
});