import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Column } from "typeorm";
import { User } from "./user";
import { Article } from "./article";

@Entity()
export class Panier {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.paniers)
  user: User;

  @ManyToMany(() => Article)
  @JoinTable()
  articles: Article[];

  @Column({ type: "decimal", nullable: true })
  totalPrice: number; 

  @Column({ type: "boolean", default: false })
  isValidated: boolean; // Si le panier est validé ou non

  @Column()
  createdAt: Date;
}