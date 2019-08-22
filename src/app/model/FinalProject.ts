export class FinalProject {
    id: number;
    name: string;
    description: string;
    owner: string;
    active: boolean;

    constructor(
        id: number,
        name: string,
        description: string,
        owner: string,
        active: boolean,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.active = active;
    }
}
