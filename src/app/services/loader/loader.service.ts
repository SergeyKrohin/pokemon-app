import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { finalize } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
    public isLoading = new Subject();
	
    public show() {
        this.isLoading.next(true);
    }
    public hide() {
        this.isLoading.next(false);
    }
	
	public onLoadChange() {
		return this.isLoading.asObservable();
	}
}

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoaderService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        this.loaderService.show();
        return next.handle(req).pipe(
            finalize(() => this.loaderService.hide())
        );
    }
}