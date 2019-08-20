export class FinalProject {
    id: number;
    name: string;
    description: string;
    owner: string;
    isActive: boolean;

    constructor(
        id: number,
        name: string,
        description: string,
        owner: string,
        isActive: boolean,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.isActive = isActive;
    }
}
