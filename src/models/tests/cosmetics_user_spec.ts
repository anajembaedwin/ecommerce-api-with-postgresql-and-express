import { User, CosmeticsStore } from '../cosmetics_user';

const store = new CosmeticsStore();

describe('Cosmetics Store Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
});