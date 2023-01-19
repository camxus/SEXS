const mongoose = require('mongoose');

const Schema = mongoose.Schema;

function pronounsLimit(val) {
  return val.length < 3;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  attributes: {
    username: {
      type: String,
      required: false,
      default: "",
      trim: true
    },
    verified: {
      type: Boolean,
      required: true,
      default: false
    },
    user_images: [{
      type: String,
      required: false
    }],
    name: {
      first_name: {
        type: String,
        required: false
      },
      last_name: {
        type: String,
        required: false
      }
    },
    location: {
      type: String,
      required: false
    },
    age: {
      type: Number,
      required: false
    },
    birthdate: {
      type: Date,
      required: false
    },
    gender: {
      type: String,
      required: false
    },
    sex: {
      type: String,
      required: false
    },
    pronouns: [{
      type: String,
      required: false,
      validate: (val) => {pronounsLimit(val)}
    }],
  },
  partners: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      request: {
        status: {
          type: String,
          enum: ["accepted", "declined", "pending"],
          default: "pending",
          required: false
        },
        date_accepted: {
          type: Date,
          required: false
        },
        date_requested: {
          type: Date,
          required: true
        },
        date_declined: {
          type: Date,
          required: false
        }
      },
      hidden: {
        value: {
          type: Boolean,
          required: false
        },
        date: {
          type: String,
          required: false
        }
      },
      blocked: {
        value: {
          type: Boolean,
          required: false
        },
        date: {
          type: String,
          required: false
        }
      },
      can_see: {
        cycle: {
          type: Boolean,
          required: false,
          default: false
        },
        health_status: {
          type: Boolean,
          required: false,
          default: false
        }
      }
    }
  ],
  reported: [{
    report: {
      type: Schema.Types.ObjectId
    },
    type: {
      type: String,
      enum: ["health", "violation"],
      required: false
    },
    date: {
      type: Date,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  violations: [{
    date: {
      type: Date,
      required: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  health: {
    tested: {
      type: Boolean,
      required: false
    },
    history: [{
      std_id: {
        type: Schema.Types.ObjectId,
        ref: 'Std'
      },
      log_date: {
        type: String,
        required: true
      },
      release_date: {
        type: String,
        required: false
      }
    }]
  },
  cycle: {
    steady: {
      type: Boolean,
      required: false
    },
    cycle_data: {
      logged_cycle_length: {
        type: Number,
        required: false
      },
      avg_cycle_length: {
        type: Number,
        required: false
      },
      max_cycle_length: {
        type: Number,
        required: false
      }
    },
    menstruation_data: {
      logged_menstruation_length: {
        type: Number,
        required: false
      },
      avg_menstruation_length: {
        type: Number,
        required: false
      },
      max_menstruation_length: {
        type: Number,
        required: false
      },
      menstruation_avg_drift: {
        type: Number,
        required: false
      },
      menstruation_max_drift: {
        type: Number,
        required: false
      }
    },
    luteal_phase_data: {
      max_luteal_phase_length: {
        type: Number,
        required: false
      },
      avg_luteal_phase_length: {
        type: Number,
        required: false
      }
    },
    estimated_next_cycle: {
      luteal_phase_daterange: [
        {
          type: Date,
          required: false
        }, 
        {
          type: Date,
          required: false
        }
      ],
      menstruation_daterange: [
        {
          type: Date,
          required: false
        }, 
        {
          type: Date,
          required: false
        }
      ],
      ovulation_date: {
        type: Date,
        required: false
      },
      fertility_daterange: [
        {
          type: Date,
          required: false
        }, 
        {
          type: Date,
          required: false
        }
      ],
    },
    cycles: [{
      luteal_phase_daterange: [
        {
          type: Date,
          required: false
        }, 
        {
          type: Date,
          required: false
        }
      ],
      menstruation_daterange: [
        {
          type: Date,
          required: false
        }, 
        {
          type: Date,
          required: false
        }
      ],
      ovulation_date: {
        type: Date,
        required: false
      },
      fertility_daterange: [
        {
          type: Date,
          required: false
        },
        {
          type: Date,
          required: false
        }
      ],
    }]
  },
  deactivated: {
    type: Boolean,
    default: false,
    required: false
  }
});

module.exports = mongoose.model('User', userSchema);
