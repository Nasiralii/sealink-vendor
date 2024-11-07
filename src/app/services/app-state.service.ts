import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

// Define the shape of the application state using an interface
interface AppState {
    permissions?: any;
    loading?: boolean;
}

@Injectable({
    providedIn: "root",
})
export class AppStateService {
    // Initial state of the application
    private initialState: AppState = {};

    // BehaviorSubject to hold the state, starting with the initial state
    private state$: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(
        this.initialState
    );

    // Getter for the current state as an observable
    public getState(): Observable<AppState> {
        return this.state$.asObservable();
    }

    // Getter for the current state value (synchronous access)
    public getCurrentState(): AppState {
        return this.state$.getValue();
    }

    // Method to update a portion of the state
    public updateState(newState: Partial<AppState>): void {
        const currentState = this.getCurrentState();
        const updatedState = {
            ...currentState,
            ...newState,
        };

        this.state$.next(updatedState);
    }

    // Reset state to initial state (for logout, reset, etc.)
    public resetState(): void {
        this.state$.next(this.initialState);
    }

    // Example: Method to set loading state
    public setLoading(loading: boolean): void {
        this.updateState({
            loading,
        });
    }

    public hasPermission(permissionQuery, permissions: any[]): boolean {
        // specialPermissionUniqueCode : "CREW ADD NEW"
        return permissions.some(
            (x) =>
                x.specialPermissionUniqueCode === permissionQuery &&
                x.specialPermissionVisibility === "Yes"
        );
    }

    public hasMenuPermission(
        permissionQuery: any,
        permissions: any[],
        type = "view"
    ): boolean {
        // console.log(permissionQuery, type,'aassaa')
        if (type === "add") {
            return permissions.some(
                (x) =>
                    x.pageName === permissionQuery &&
                    x.menuPermissionAdd === "Yes" &&
                    x.menuPermissionAdd === "Yes"
            );
        }
        else if (type === "view") {
            return permissions.some(
                (x) =>
                    x.pageName === permissionQuery &&
                    x.menuPermissionView === "Yes" &&
                    x.menuPermissionVisibility === "Yes"
            );
        }
        else if (type === "edit") {
            return permissions.some(
                (x) =>
                    x.pageName === permissionQuery &&
                    x.menuPermissionEdit === "Yes" &&
                    x.menuPermissionEdit === "Yes"
            );
        }
        else if (type === "delete") {
            return permissions.some(
                (x) =>
                    x.pageName === permissionQuery &&
                    x.menuPermissionDelete === "Yes" &&
                    x.menuPermissionDelete === "Yes"
            );
        }
        else if (type === "print") {
            return permissions.some(
                (x) =>
                    x.pageName === permissionQuery &&
                    x.menuPermissionPrint === "Yes" &&
                    x.menuPermissionPrint === "Yes"
            );
        }

        return false;
    }
}
