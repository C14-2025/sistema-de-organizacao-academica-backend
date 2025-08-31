export class InMemoryUserRepository {

  users = [];

  async create(user) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
      created: new Date(),
      updated: new Date(),
    };

    this.users.push(newUser);

    return newUser;
  }

  async update(userId, user) {
    const existingUser = this.users.find((u) => u.id === userId);

    if (!existingUser) {
      throw new Error("User not found.");
    }

    const updatedUser = {
      ...existingUser,
      ...user,
      updated: new Date(),
    };

    this.users = this.users.map((u) => (u.id === userId ? updatedUser : u));

    return updatedUser;
  }

  async delete(userId){
    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1) {
      throw new Error("User not found.");
    }
    this.users.splice(index, 1);
  }

  async findByEmail(email) {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

  async findById(userId) {
    const user = this.users.find((u) => u.id === userId);
    return user || null;
  }

  findByName(name){
    const user = this.users.find((d) => d.name === name);

    return Promise.resolve(user || null);
  }

}
