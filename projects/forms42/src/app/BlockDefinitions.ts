import { Component } from '@angular/core';

/*
    Typescript doesn't like classes with annotations/decorators (@)
    that are not referenced. The only purpose of this class, is to hold
    a dummy reference to all blocks.
*/


@Component({template: ''})
export class BlockDefinitions {}
