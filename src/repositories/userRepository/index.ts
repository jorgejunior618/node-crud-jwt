import db from "../../dataBase/db";
import DbError from "../../models/Errors";

class UserRepository {
  async search(): Promise<User[]> {
    try {
      const query = `
      SELECT id, name
      FROM application_user
    `;

      const { rows } = await db.query<User>(query);
      return rows ?? [];
    } catch (error) {
      throw new DbError('Erro na consulta', error);
    }
  }
  
  async searchUser(id: string): Promise<User> {
    try {
      const query = `
        SELECT id, name
        FROM application_user
        WHERE id = $1
      `;
  
      const { rows } = await db.query<User>(query, [id]);
      const [ user ] = rows;
      return user;
    } catch (error) {
      throw new DbError('Erro na consulta por ID', error);
    }
  }
  
  async create({ name, password}: User): Promise<string> {
    try {
      const query = `
        INSERT
        INTO application_user
        (name, password)
        VALUES ($1, crypt($2, 'encriptacao'))
        RETURNING id
      `;
  
      const { rows: [ newUser ] } = await db.query<{id: string}>(query, [name, password]);
      
      return newUser.id;
    } catch (error) {
      throw new DbError('Error na criação de usuário', error);
    }
  }
  
  async update({ name, password}: User, id: string): Promise<void> {
    try {
      const query = `
        UPDATE application_user
        SET 
          name = $1,
          password = crypt($2, 'encriptacao')
        
        WHERE
          id = $3
        RETURNING id
      `;
      
      await db.query(query, [name, password, id]);
    } catch (error) {
      throw new DbError('Error na atualização de dados do usuário', error);
    }
  }

  
  async remove(id: string): Promise<void> {
    try {
      const query = `
        DELETE
        FROM application_user
        WHERE ID = $1
      `;
      
      await db.query(query, [id]);
    } catch (error) {
      throw new DbError('Error na remoção de usuário', error);
    }
  }
}

export default new UserRepository;
