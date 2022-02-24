import {
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class BasePostgresEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn({ type: "timestamp with time zone" })
    createdAt: Date
    @UpdateDateColumn({ type: "timestamp with time zone", nullable: true })
    updatedAt: Date
    @DeleteDateColumn({ type: "timestamp with time zone", nullable: true })
    deleteAt: Date
}