import { create } from 'zustand';

const useGameStore = create((set) => ({
    people: [
        { id: 1, name: '', gender: '' },
        { id: 2, name: '', gender: '' },
        { id: 3, name: '', gender: '' },
        { id: 4, name: '', gender: '' },
    ],
    rounds: 0,
    setRounds: (rounds) => set({ rounds }),
    addPerson: () =>
        set((state) => ({
            people: [
                ...state.people,
                {
                    id: state.people.length + 1,
                    name: '',
                    gender: '',
                },
            ],
        })),
    updatePerson: (id, field, value) =>
        set((state) => ({
            people: state.people.map((person) =>
                person.id === id ? { ...person, [field]: value } : person
            ),
        })),
}));

export default useGameStore;
