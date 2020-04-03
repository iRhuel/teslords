import { Sequelize } from 'sequelize';
import sequelize from '..';

export interface BaseAttributes {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

interface ModelDefinition {
  name: string;
  initialize(sequelize: Sequelize): void;
  associate?: (sequelize: Sequelize) => void;
  associateBehaviors?: () => void;
}

interface Models {
  [key: string]: ModelDefinition;
}

const models: Models = {};

const isModelDefinition = (val: any): val is ModelDefinition => {
  return 'initialize' in val;
};

const initialize = (model: any) => {
  if (isModelDefinition(model)) {
    model.initialize(sequelize);
    models[model.name] = model;
  }
};

// import and initialize models here
import User from './User';
initialize(User);
import Vehicle from './Vehicle';
initialize(Vehicle);
import Token from './Token';
initialize(Token);
import Charge from './Charge';
initialize(Charge);
import ChargeState from './ChargeState';
initialize(ChargeState);

for (const model of Object.values(models)) {
  if (model.associate) {
    model.associate(sequelize);
  }
  if (model.associateBehaviors) {
    model.associateBehaviors();
  }
}

// add imported models here
export { User, Vehicle, Token, Charge, ChargeState };
