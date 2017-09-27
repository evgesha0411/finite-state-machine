class FSM {

    constructor(config) 
	{
		this.initialState = config.initial;
		this.currentState = config.initial;
		this.states = ['normal', 'busy', 'hungry', 'sleeping'];
		this.events = ['study', 'get_hungry', 'get_tired', 'get_up', 'eat'];
		this.counter = 0;
		this.memory = [];
		this.feature = [];
	}

    getState() 
	{
		return this.currentState;
	}

    changeState(state) 
	{
		if(this.states.indexOf(state) != -1)
		{
			this.currentState = state;
		}
		else
		{
			throw new Error("Wrong state!!");
		}
	}

    trigger(event) 
	{
		if(this.events.indexOf(event) != -1)
		{
			switch(event)
			{
				case this.events[0]: 
				{
					if(this.currentState == this.states[0]) 
					{
						if(this.memory.indexOf(this.currentState) == -1)
						{
							this.memory.push(this.currentState);
						}
								
						this.currentState = this.states[1];
											
						if(this.feature.indexOf(this.currentState) == -1)
						{
							this.feature.push(this.currentState);
						}
						}
						else
						{
							throw new Error("Wrong event!!");
						}
				} break;
									 
				case this.events[1]: 
				{ 	
					if(this.currentState == this.states[1] || this.currentState == this.states[3]) 
					{
						if(this.memory.indexOf(this.currentState) == -1)
						{
							this.memory.push(this.currentState);
						}
									
						this.currentState = this.states[2];
									
						if(this.feature.indexOf(this.currentState) == -1)
						{
							this.feature.push(this.currentState);
						}
					}
					else
					{
						throw new Error("Wrong event!!");
					}
				} break;
										
				case this.events[2]: 
				{ 	
					if(this.currentState == this.states[1]) 
					{
						if(this.memory.indexOf(this.currentState) == -1)
						{
							this.memory.push(this.currentState);
						}
											
						this.currentState = this.states[3];
						
						if(this.feature.indexOf(this.currentState) == -1)
						{
							this.feature.push(this.currentState);
						}
					}
					else
					{
						throw new Error("Wrong event!!");
					}
				} break;
									 
				case this.events[3]: 
				{ 	
					if(this.currentState == this.states[3]) 
					{
						if(this.memory.indexOf(this.currentState) == -1)
						{
							this.memory.push(this.currentState);
						}
											
						this.currentState = this.states[0];
									
						if(this.feature.indexOf(this.currentState) == -1)
						{
							this.feature.push(this.currentState);
						}
					}
					else
					{
						throw new Error("Wrong event!!");
					}
				} break;
									 
				case this.events[4]: 
				{ 	
					if(this.currentState == this.states[2]) 
					{
						if(this.memory.indexOf(this.currentState) == -1)
						{
							this.memory.push(this.currentState);
						}
											
						this.currentState = this.states[0];
											
						if(this.feature.indexOf(this.currentState) == -1)
						{
							this.feature.push(this.currentState);
						}
					}
					else
					{
						throw new Error("Wrong event!!");
					}
				} break;
			}
			this.counter++;
		}
		else
		{
			throw new Error("Wrong event!!");
		}
	}

    reset() 
	{
		this.currentState = this.initialState;
	}

    getStates(event) 
	{
		if(event == undefined)
		{
			return this.states;
		}
		
		var arr = [];
		
		switch(event)
		{
			case this.events[0]: { arr.push(this.states[0])} break;
			case this.events[1]: { arr.push(this.states[1], this.states[3])} break;
			case this.events[2]: { arr.push(this.states[1])} break;
			case this.events[3]: { arr.push(this.states[2])} break;
			case this.events[4]: { arr.push(this.states[3])} break;
		}
		
		return arr;
	}

    undo() 
	{
		if(this.memory[this.counter-1] === undefined || this.counter <= 0)
		{
			this.currentState = this.states[0];
			return false;
		}
		
		this.currentState = this.memory[this.counter-1];
		this.counter--;
		return true;
	}

    redo() 
	{
		if(this.feature[this.counter] === undefined)
		{
			return false;
		}
		
		this.currentState = this.feature[this.counter];
		this.counter++;
		return true;
	}

    clearHistory() 
	{
		this.memory = [];
		this.feature = [];
	}
}

module.exports = FSM;

